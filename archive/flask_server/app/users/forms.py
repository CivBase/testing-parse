"""
WTForm forms for users.
"""
from flask.ext.wtf import Form, RecaptchaField
from wtforms import PasswordField, StringField
from wtforms.validators import DataRequired, Email, EqualTo


class LoginForm(Form):
    """
    Form for authenticating.
    """
    email = StringField(
        label='Email',
        validators=[DataRequired(), Email()])

    password = PasswordField(
        label='Password',
        validators=[DataRequired()])


class RegisterForm(Form):
    """
    Form for creating new Users.
    """
    email = StringField(
        label='Email',
        validators=[DataRequired(), Email()])

    password = PasswordField(
        label='Password',
        validators=[DataRequired()])

    confirm = PasswordField(
        label='Repeat Password',
        validators=[
            DataRequired(),
            EqualTo('password', message='Passwords must match')
        ])

    recaptcha = RecaptchaField()
