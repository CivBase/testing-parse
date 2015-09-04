import json

from flask import Blueprint, render_template, request
from sqlalchemy.exc import IntegrityError

from app import db
from app.foo.forms import CreateFooForm
from app.foo.models import Foo
from app.users.decorators import requires_login


mod = Blueprint('foo', __name__, url_prefix='/foo')


@mod.route('/', methods=['GET', 'POST'])
@requires_login()
def foobar():
    """
    Page for viewing and creating Foos with form (handled on POST).
    """
    form = CreateFooForm(request.form)
    if not form.validate_on_submit():
        if form.is_submitted():
            # Validation failed
            # flash('Failed to create foo!', 'error')
            pass

        return render_template('foo/foo.html', form=form)

    # POST - Create a new Foo
    foo = Foo(
        number=form.number.data,
        text=form.text.data,
        boolean=form.boolean.data)

    try:
        # Add new Foo to the database
        db.session.add(foo)
        db.session.commit()

    except IntegrityError:
        # Failure while adding to the database
        # flash('Failed to create foo!', 'error')
        return render_template('foo/foo.html', form=form)

    # Success!
    # flash('Created a new foo!', 'success')
    return json.dumps(foo.dict)


@mod.route('/<int:foo_id>', methods=['GET'])
@requires_login()
def get(foo_id):
    """
    Retrieves a jsonified Foo instance with the given id (primary key).
    """
    # Get the Foo from the database
    foo = Foo.query.get(foo_id)

    # Convert to json
    return json.dumps(foo.dict)


@mod.route('/<int:foo_id>', methods=['DELETE'])
@requires_login()
def delete(foo_id):
    """
    Removes a Foo instance with the given id (primary key) from the database.
    """
    # Get the Foo from the database
    foo = Foo.query.get(foo_id)

    # Remove the foo from the database
    db.session.delete(foo)
    db.session.commit()

    # Convert to json
    return json.dumps(foo.dict)


@mod.route('/fetch/', methods=['GET'])
@requires_login()
def fetch():
    """
    Retrieves all Foo instances.
    """
    # Get all Foos from the database
    foos = Foo.query.all()

    # Append the Foos as dictionaries
    resources = []
    for foo in foos:
        resources.append(foo.dict)

    # Convert to json
    return json.dumps(resources)
