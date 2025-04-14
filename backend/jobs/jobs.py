from database.models import Job, User
from database.db import db

class JobService:
    @staticmethod
    def create_job(title, description, location, wage, profession, employer_id):
        job = Job(
            title=title,
            description=description,
            location=location,
            wage_offering=wage,
            required_profession=profession,
            employer_id=employer_id
        )
        db.session.add(job)
        db.session.commit()
        return job

    @staticmethod
    def get_jobs(location=None, profession=None):
        query = Job.query.filter_by(is_active=True)
        
        if location:
            query = query.filter(Job.location.ilike(f'%{location}%'))
        if profession:
            query = query.filter(Job.required_profession.ilike(f'%{profession}%'))
            
        return query.order_by(Job.created_at.desc()).all()