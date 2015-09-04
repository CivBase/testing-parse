from mock import patch

from app.users import models
from test.utils import DatabaseTestCase


class TestUser(DatabaseTestCase):
    def test_user(self):
        test_user = models.User(
            email='testuser2@iastate.edu',
            password='secret')

        self.db.session.add(test_user)
        self.db.session.commit()

        result = models.User.query.get(test_user.id)
        self.assertDictEqual(
            result.dict,
            {
                'id': 1,
                'email': 'testuser2@iastate.edu',
                'password': 'secret'
            })

    @patch('app.users.models.ADMINS', ['testuser2@iastate.edu'])
    def test_is_admin(self):
        test_user = models.User(
            email='testuser2@iastate.edu',
            password='secret')

        self.assertTrue(models.User.is_admin(test_user))

    @patch('app.users.models.ADMINS', [])
    def test_not_is_admin(self):
        test_user = models.User(
            email='testuser2@iastate.edu',
            password='secret')

        self.assertFalse(models.User.is_admin(test_user))
