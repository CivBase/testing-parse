from flask.ext.wtf import Form
from wtforms import BooleanField, IntegerField, StringField
from wtforms.validators import DataRequired


class CreateFooForm(Form):
    """
    Form for creating new Foos.
    """
    number = IntegerField(
        label='Number',
        validators=[DataRequired()])

    text = StringField(
        label='Text',
        validators=[DataRequired()])

    boolean = BooleanField(
        label='Boolean',
        validators=[])
