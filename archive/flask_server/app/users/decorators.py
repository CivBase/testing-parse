"""
HTTP route handler decorators for users.
"""
from functools import wraps

from config import ADMINS
from flask import flash, g, redirect, request, url_for


def requires_login():
    """
    Flask route decorator which designates an authenticated requirement for a
    request.
    """
    def decorator_function(f):
        @wraps(f)
        def wrapper_function(*args, **kwargs):
            # Make sure there is a user on the session
            if g.user is None:
                flash('You need to be signed in for this page.', 'error')
                return redirect(url_for('users.login', next=request.path))

            return f(*args, **kwargs)

        return wrapper_function

    return decorator_function


def requires_authorization(authorized=ADMINS):
    """
    Flask route decorator which designates an authorization requirement for a
    request.
    """
    def decorator_function(f):
        @wraps(f)
        def wrapper_function(*args, **kwargs):
            # Make sure the session user is part of the authorized group
            if g.user is None or g.user.email not in authorized:
                flash('You are not authorized to view this page.', 'error')
                return redirect(
                    request.args.get('next') or
                    request.referrer or
                    url_for('users.login'))

            return f(*args, **kwargs)

        return wrapper_function

    return decorator_function
