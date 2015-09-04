"""
HTTP route handlers for the users module.
"""
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for)
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

from app import db
from app.users.forms import LoginForm, RegisterForm
from app.users.models import User
from app.users.decorators import requires_login


# Initialize the module blueprint
mod = Blueprint('users', __name__, url_prefix='/users')


def _validate_login_form(form):
    """
    Validates a LoginForm and assigns the user to the session if successful.
    """
    # Make sure the form is submitted
    if not form.is_submitted():
        return False

    # Run WTForm validators
    if not form.validate():
        for field, errors in form.errors.iteritems():
            for error in errors:
                flash(error, 'error')

        return False

    # Validate the user credentials
    user = User.query.filter_by(email=form.email.data).first()
    if not (user and check_password_hash(
            user.password, form.password.data)):
        flash('Invalid email or password', 'error')
        return False

    # Assign the user to the session
    session['user_id'] = user.id
    flash('Welcome to the test server!')
    return True


def _validate_register_form(form):
    """
    Validates a RegisterForm and creates the user and assigns it to the session
    if successful.
    """
    # Make sure the form is submitted
    if not form.is_submitted():
        return False

    # Run WTForm validators
    if not form.validate():
        for field, errors in form.errors.iteritems():
            for error in errors:
                flash(error, 'error')

        return False

    # Create a new user
    user = User(
        email=form.email.data,
        password=generate_password_hash(form.password.data))

    # Add the user to the database
    try:
        db.session.add(user)
        db.session.commit()

    except IntegrityError:
        flash('Failed to register new user!', 'error')
        return False

    # Assign the user to the session
    session['user_id'] = user.id
    flash('Thanks for registering!', 'success')
    return True


@mod.route('/profile/')
@requires_login()
def home():
    """
    User profile page.
    """
    return render_template('users/profile.html', user=g.user)


@mod.route('/login/', methods=['GET', 'POST'])
def login():
    """
    Login page with form (handled on POST).
    """
    form = LoginForm(request.form)
    if request.method == 'POST' and _validate_login_form(form):
        return redirect(url_for('users.home'))

    return render_template(
        'users/login.html',
        form=form,
        is_admin=User.is_admin(g.user))


@mod.route('/logout/')
def logout():
    """
    Un-assigns the user from the session and redirects to the login page.
    """
    session['user_id'] = None
    return redirect(url_for('users.login'))


@mod.route('/register/', methods=['GET', 'POST'])
def register():
    """
    Registration page with form (handled on POST).
    """
    form = RegisterForm(request.form)
    if request.method == 'POST' and _validate_register_form(form):
        return redirect(url_for('users.home'))

    return render_template(
        'users/register.html',
        form=form,
        is_admin=User.is_admin(g.user))
