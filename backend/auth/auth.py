from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta
from database.models import User
from database.db import db

class Auth:
    @staticmethod
    def signup(email, password, phone,name, is_employer=False):
        if User.query.filter_by(email=email).first():
            return None  # User exists
        
        new_user = User(
            email=email,
            password_hash=generate_password_hash(password),
            phone=phone,
            is_employer=is_employer,
            name=name
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def login(email, password):
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return None
        
        access_token = create_access_token(
            identity=user.id,
            expires_delta=timedelta(days=30),
            additional_claims={'is_employer': user.is_employer}
        )
        return access_token