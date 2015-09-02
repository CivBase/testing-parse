"""
Database models for users.
"""
from sqlalchemy_utils import EncryptedType

from app import db
from config import ADMINS, SECRET_KEY


class User(db.Model):
    """
    Database model representing a user.
    """
    __tablename__ = 'users_user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(EncryptedType(db.String(120), SECRET_KEY))
    # TODO: Email verification

    def __init__(self, email, password):
        self.email = email
        self.password = password

    @property
    def dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password
        }

    def __repr__(self):
        return '<User {email}>'.format(email=self.email)

    @staticmethod
    def is_admin(user):
        return user is not None and user.email in ADMINS
