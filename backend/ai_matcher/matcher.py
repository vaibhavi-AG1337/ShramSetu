from database.models import Job, Worker
from database.db import db
from sms.sms import SMSService
import logging
from datetime import datetime

class AIMatcher:
    @staticmethod
    def find_and_notify_matches():
        """Finds matching jobs for workers and sends SMS notifications"""
        try:
            logging.info("🔍 Starting job-worker matching process...")
            
            # Get active jobs and matching workers
            active_jobs = Job.query.filter_by(is_active=True).all()
            if not active_jobs:
                logging.info("No active jobs found")
                return

            for job in active_jobs:
                logging.info(f"Checking job #{job.id}: {job.title} in {job.location}")
                
                # Find workers with matching skills and location
                matching_workers = Worker.query.filter(
                    Worker.expertise.ilike(f'%{job.required_profession}%'),
                    Worker.location.ilike(f'%{job.location}%')
                ).all()

                if not matching_workers:
                    logging.info(f"No matching workers found for job #{job.id}")
                    continue

                # Send SMS to each matching worker
                sms_service = SMSService.get_instance()
                for worker in matching_workers:
                    try:
                        message = (
                            f"🏢 {job.location} में {job.employer.name} जी को {job.required_profession} की आवश्यकता है\n"
                            f"आप इस काम के लिए उपयुक्त हैं!\n\n"
                            f"काम का विवरण:\n"
                            f"शीर्षक: {job.title}\n"
                            f"विवरण: {job.description}\n"
                            f"वेतन: {job.wage_offering}\n"
                            f"स्थान: {job.location}\n\n"
                            f"संपर्क करें: {job.employer.phone}"
                        )
                        
                        if sms_service.send_sms(worker.phone, message):
                            logging.info(f"📩 SMS sent to worker #{worker.id} ({worker.phone})")
                            job.is_active = False  # Mark job as filled
                            db.session.commit()
                        else:
                            logging.error(f"❌ Failed to send SMS to worker #{worker.id}")

                    except Exception as e:
                        logging.error(f"Error processing worker #{worker.id}: {str(e)}", exc_info=True)
                        db.session.rollback()

        except Exception as e:
            logging.error(f"⛔ Critical error in matching process: {str(e)}", exc_info=True)
            raise