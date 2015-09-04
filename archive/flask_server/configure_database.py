"""
Reset the database and build all of the db.Model tables from scratch.
"""
import os

from app import db


# Delete the old database
db_file = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')
if os.path.exists(db_file):
    os.remove(db_file)

# Create a new one
open(db_file, 'w').close()
db.create_all()
