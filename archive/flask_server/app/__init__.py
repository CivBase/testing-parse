"""
Application creating and setup with global HTTP route handlers.
"""
from flask import Flask, g, redirect, render_template, session, url_for
from flask.ext.sqlalchemy import SQLAlchemy

from app.util.assets import register_assets
from app.util.security import install_secret_key


# Create and configure the app
app = Flask(__name__)
app.config.from_object('config')

# Initialize the database object-mapper
db = SQLAlchemy(app)

# Prepare static (javascript/css) assets
register_assets(app)

# Install secret key
if not app.config['DEBUG']:
    install_secret_key(app)


# Configure route modules
from app.users.models import User


def before_request():
    """
    Pull user's profile from the database before every request is handled.
    """
    g.user = None
    user_id = session.get('user_id')
    if user_id is not None:
        g.user = User.query.get(user_id)


from app.foo.routes import mod as foo_module
foo_module.before_request(before_request)
app.register_blueprint(foo_module)


from app.users.routes import mod as users_module
users_module.before_request(before_request)
app.register_blueprint(users_module)

# Global routes
@app.errorhandler(404)
def not_found(error):
    """
    Handles requests to routes which do not exist.
    """
    return render_template('404.html', error=error), 404


@app.route('/')
def index():
    """
    Redirects the index page to the profile page.
    """
    if session.get('user_id'):
        return redirect(url_for('users.home'))

    return redirect(url_for('users.login'))
