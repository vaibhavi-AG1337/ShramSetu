import pytz
import logging
from datetime import timedelta
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger

# Local imports
from auth.auth import Auth
from jobs.jobs import JobService
from workers.workers import WorkerService
from ai_matcher.matcher import AIMatcher
from database.db import db
from config import Config

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": Config.CORS_ORIGINS if hasattr(Config, 'CORS_ORIGINS') else "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True if hasattr(Config, 'CORS_SUPPORTS_CREDENTIALS') else False
    }
})

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)

# Configure JWT
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]  # If using cookies

# Initialize scheduler with explicit timezone
kolkata_tz = pytz.timezone('Asia/Kolkata')
scheduler = BackgroundScheduler(timezone=kolkata_tz)

def run_matching_with_context():
    """Wrapper function to run matching with app context"""
    with app.app_context():
        try:
            AIMatcher.find_and_notify_matches()
        except Exception as e:
            logger.error(f"Scheduled job failed: {str(e)}", exc_info=True)

scheduler.add_job(
    run_matching_with_context,
    IntervalTrigger(minutes=30, timezone=kolkata_tz),
    misfire_grace_time=60,
    id='job_matching'
)

# ==================== ROUTES ==================== #

@app.route('/')
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Job matching backend is running",
        "version": "1.0.0"
    })

# ----------------- Auth Routes ----------------- #

@app.route('/api/signup/employer', methods=['POST', 'OPTIONS'])
def employer_signup():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        data = request.get_json()
        required_fields = ['email', 'password', 'phone', 'name']
        if not data or not all(key in data for key in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
            
        user = Auth.signup(
            email=data['email'],
            password=data['password'],
            phone=data['phone'],
            name=data['name'],
            is_employer=True
        )
        if not user:
            return jsonify({"error": "User already exists"}), 400
            
        return _corsify_response(jsonify({
            "message": "Employer created successfully",
            "user_id": user.id
        })), 201
    except Exception as e:
        logger.error(f"Signup error: {str(e)}", exc_info=True)
        return _corsify_response(jsonify({"error": "Internal server error"})), 500

@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        data = request.get_json()
        if not data or not all(key in data for key in ['email', 'password']):
            return jsonify({"error": "Missing email or password"}), 400
            
        token = Auth.login(data['email'], data['password'])
        if not token:
            return jsonify({"error": "Invalid credentials"}), 401
            
        response = jsonify({
            "access_token": token,
            "message": "Login successful"
        })
        return _corsify_response(response), 200
    except Exception as e:
        logger.error(f"Login error: {str(e)}", exc_info=True)
        return _corsify_response(jsonify({"error": "Internal server error"})), 500

# ----------------- Job Routes ----------------- #

@app.route('/api/jobs', methods=['POST', 'OPTIONS'])
@jwt_required()
def create_job():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        required_fields = ['title', 'description', 'location', 'wage', 'profession']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
            
        job = JobService.create_job(
            title=data['title'],
            description=data['description'],
            location=data['location'],
            wage=data['wage'],
            profession=data['profession'],
            employer_id=current_user_id
        )
        
        return _corsify_response(jsonify({
            "message": "Job created successfully",
            "job_id": job.id
        })), 201
    except Exception as e:
        logger.error(f"Job creation error: {str(e)}", exc_info=True)
        return _corsify_response(jsonify({"error": "Internal server error"})), 500

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    try:
        location = request.args.get('location')
        profession = request.args.get('profession')
        jobs = JobService.get_jobs(location, profession)
        
        return _corsify_response(jsonify({
            "count": len(jobs),
            "jobs": [{
                "id": job.id,
                "title": job.title,
                "description": job.description,
                "location": job.location,
                "wage": job.wage_offering,
                "profession": job.required_profession,
                "posted_at": job.created_at.isoformat()
            } for job in jobs]
        })), 200
    except Exception as e:
        logger.error(f"Get jobs error: {str(e)}", exc_info=True)
        return _corsify_response(jsonify({"error": "Internal server error"})), 500

# ----------------- Worker Routes ----------------- #

@app.route('/api/worker', methods=['POST', 'OPTIONS'])
def create_worker():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        data = request.get_json()
        required_fields = ['name', 'expertise', 'location', 'phone']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
            
        worker = WorkerService.create_worker(
            name=data['name'],
            age=data.get('age'),
            expertise=data['expertise'],
            location=data['location'],
            expected_wage=data.get('wage'),
            phone=data['phone']
        )
        
        return _corsify_response(jsonify({
            "message": "Worker created successfully",
            "worker_id": worker.id
        })), 201
    except Exception as e:
        logger.error(f"Create worker error: {str(e)}", exc_info=True)
        return _corsify_response(jsonify({"error": "Internal server error"})), 500

# ----------------- Manual Trigger ----------------- #

@app.route('/api/trigger-match', methods=['POST', 'OPTIONS'])
@jwt_required()
def manual_trigger():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    try:
        with app.app_context():
            AIMatcher.find_and_notify_matches()
        return _corsify_response(jsonify({
            "success": True,
            "message": "Matching process completed successfully"
        })), 200
    except Exception as e:
        logger.error(f"Manual trigger failed: {str(e)}", exc_info=True)
        return _corsify_response(jsonify({
            "success": False,
            "error": str(e)
        })), 500

# ----------------- CORS Helpers ----------------- #

def _build_cors_preflight_response():
    response = jsonify({"message": "Preflight accepted"})
    response.headers.add("Access-Control-Allow-Origin", 
                        Config.CORS_ORIGINS[0] if hasattr(Config, 'CORS_ORIGINS') else "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    return response

def _corsify_response(response):
    response.headers.add("Access-Control-Allow-Origin", 
                        Config.CORS_ORIGINS[0] if hasattr(Config, 'CORS_ORIGINS') else "*")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

# ==================== MAIN ==================== #

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    try:
        scheduler.start()
        app.run(host='0.0.0.0', port=5000, debug=Config.DEBUG)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
    except Exception as e:
        logger.error(f"Application startup failed: {str(e)}", exc_info=True)