from mock import Mock, patch

from app.users import routes
from test.utils import RouteTestCase


class TestLogin(RouteTestCase):
    def setUp(self):
        super(TestLogin, self).setUp()
        login_form_mock = patch.object(routes, 'LoginForm').start()
        self.form_mock = login_form_mock.return_value
        self.query_mock = patch.object(routes.User, 'query').start()

    def test_get(self):
        resp = self.app.get('/users/login/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Please sign in</h2>')

    def test_post_without_form_submitted(self):
        self.form_mock.is_submitted.return_value = False

        resp = self.app.post('/users/login/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Please sign in</h2>')

    @patch.object(routes, 'flash')
    def test_post_fail_validation(self, flash_mock):
        self.form_mock.is_submitted.return_value = True
        self.form_mock.validate.return_value = False
        self.form_mock.errors = {'': ['error message']}

        resp = self.app.post('/users/login/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Please sign in</h2>')

        flash_mock.assert_called_once_with('error message', 'error')

    @patch.object(routes, 'flash')
    def test_post_no_user(self, flash_mock):
        self.form_mock.is_submitted.return_value = True
        self.form_mock.validate.return_value = True
        self.query_mock.filter_by.return_value.first.return_value = None

        resp = self.app.post('/users/login/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Please sign in</h2>')

        flash_mock.assert_called_once_with(
            'Invalid email or password', 'error')

    @patch.object(routes, 'check_password_hash')
    @patch.object(routes, 'flash')
    def test_post_fail_password_check(self, flash_mock, hash_mock):
        self.form_mock.is_submitted.return_value = True
        self.form_mock.validate.return_value = True
        self.query_mock.filter_by.return_value.first.return_value = Mock(
            id=1337, email='testuser@iastate.edu', password='secret')

        hash_mock.return_value = False

        resp = self.app.post('/users/login/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Please sign in</h2>')

        hash_mock.assert_called_once_with(
            'secret', self.form_mock.password.data)

        flash_mock.assert_called_once_with(
            'Invalid email or password', 'error')

    @patch.object(routes, 'check_password_hash')
    @patch.object(routes, 'flash')
    def test_post_success(self, flash_mock, hash_mock):
        self.form_mock.is_submitted.return_value = True
        self.form_mock.validate.return_value = True
        self.query_mock.filter_by.return_value.first.return_value = Mock(
            id=1337, email='testuser@iastate.edu', password='secret')

        hash_mock.return_value = True

        resp = self.app.post('/users/login/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h1>Hello, you!</h1>')

        hash_mock.assert_called_once_with(
            'secret', self.form_mock.password.data)

        flash_mock.assert_called_once_with('Welcome to the test server!')
        with self.app.session_transaction() as sess:
            self.assertEqual(sess['user_id'], 1337)


class TestLogout(RouteTestCase):
    def test_get(self):
        resp = self.app.get('/users/logout/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Please sign in</h2>')

        with self.app.session_transaction() as sess:
            self.assertIsNone(sess['user_id'])


class TestRegister(RouteTestCase):
    def setUp(self):
        super(TestRegister, self).setUp()
        register_form_mock = patch.object(routes, 'RegisterForm').start()
        self.form_mock = register_form_mock.return_value

    def test_get(self):
        resp = self.app.get('/users/register/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Create a new account</h2>')

    def test_post_without_form_submitted(self):
        self.form_mock.is_submitted.return_value = False

        resp = self.app.post('/users/register/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Create a new account</h2>')

    @patch.object(routes, 'flash')
    def test_post_fail_validation(self, flash_mock):
        self.form_mock.is_submitted.return_value = True
        self.form_mock.validate.return_value = False
        self.form_mock.errors = {'': ['error message']}

        resp = self.app.post('/users/register/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Create a new account</h2>')

        flash_mock.assert_called_once_with('error message', 'error')

    @patch.object(routes.db.session, 'commit')
    @patch.object(routes, 'flash')
    def test_post_fail_commit(self, flash_mock, commit_mock):
        self.form_mock.is_submitted.return_value = True
        self.form_mock.validate.return_value = True
        self.form_mock.email.data = 'testuser2@iastate.edu'
        self.form_mock.password.data = 'secret'
        commit_mock.side_effect = routes.IntegrityError(1, 2, 3)

        resp = self.app.post('/users/register/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h2>Create a new account</h2>')

        flash_mock.assert_called_once_with(
            'Failed to register new user!', 'error')

    @patch.object(routes, 'flash')
    def test_post_success(self, flash_mock):
        self.form_mock.is_submitted.return_value = True
        self.form_mock.validate.return_value = True
        self.form_mock.email.data = 'testuser2@iastate.edu'
        self.form_mock.password.data = 'secret'

        resp = self.app.post('/users/register/')
        resp = resp.maybe_follow()
        resp.mustcontain('<h1>Hello, you!</h1>')

        flash_mock.assert_called_once_with('Thanks for registering!', 'success')
        with self.app.session_transaction() as sess:
            self.assertEqual(sess['user_id'], 2)
