import unittest
from mock import patch

from flask.ext.webtest import TestApp

from app import app, db
from app.users.models import User


class BaseTestCase(unittest.TestCase):
    """
    Base test class which all other test cases should extend.
    """
    def setUp(self):
        self.addCleanup(patch.stopall)


class DatabaseTestCase(BaseTestCase):
    """
    Base test class for dealing with the application and database.
    """
    def setUp(self):
        super(DatabaseTestCase, self).setUp()

        # Setup app for testing
        self.app = TestApp(app, db=db, use_session_scopes=True)
        self.app_context = app.app_context()
        self.app_context.push()

        # Setup database for testing
        self.db = db
        self.db.create_all()

    def tearDown(self):
        # Clean up the test app and database
        db.drop_all()
        self.app_context.pop()


class RouteTestCase(BaseTestCase):
    """
    Base test class for dealing with HTTP route handlers.
    """
    def setUp(self):
        super(RouteTestCase, self).setUp()

        # Setup app for testing
        self.app = TestApp(app, db=db, use_session_scopes=True)
        self.app_context = app.app_context()
        self.app_context.push()

        # Setup database for testing
        self.db = db
        self.db.create_all()

        # Create a new user
        user = User(
            email='testuser@iastate.edu',
            password='secret')

        self.db.session.add(user)
        self.db.session.commit()

        # Assign the user to the session
        with self.app.session_transaction() as sess:
            sess['user_id'] = user.id

    def tearDown(self):
        # Clean up the test app and database
        db.drop_all()
        self.app_context.pop()
