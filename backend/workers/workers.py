from database.models import Worker
from database.db import db

class WorkerService:
    @staticmethod
    def create_worker(name, age, expertise, location, expected_wage, phone):
        worker = Worker(
            name=name,
            age=age,
            expertise=expertise,
            location=location,
            expected_wage=expected_wage,
            phone=phone
        )
        db.session.add(worker)
        db.session.commit()
        return worker

    @staticmethod
    def get_workers_by_skills(expertise, location=None):
        query = Worker.query.filter(Worker.expertise.ilike(f'%{expertise}%'))
        if location:
            query = query.filter(Worker.location.ilike(f'%{location}%'))
        return query.all()