from datetime import datetime

from app import db


class Foo(db.Model):
    """
    Database model for testing and demonstration.
    """
    __tablename__ = 'foobar'
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer)
    text = db.Column(db.String(120))
    boolean = db.Column(db.Boolean)
    date = db.Column(db.DateTime)

    def __init__(self, number, text, boolean):
        self.number = number
        self.text = text
        self.boolean = boolean
        self.date = datetime.now()

    @property
    def dict(self):
        return {
            'id': self.id,
            'number': self.number,
            'text': self.text,
            'boolean': self.boolean,
            'date': str(self.date)
        }
