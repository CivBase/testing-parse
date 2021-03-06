"""
Security management tools.
"""
import os
import sys


def install_secret_key(app, filename='secret_key'):
    """
    Configure the SECRET_KEY from a file in the instance directory.

    If the file does not exist, print instructions to create it from a shell
    with a random key, then exit.
    """
    filename = os.path.join(app.instance_path, filename)

    try:
        app.config['SECRET_KEY'] = open(filename, 'rb').read()

    except IOError:
        print('Error: No secret key. Create it with:')
        full_path = os.path.dirname(filename)
        if not os.path.isdir(full_path):
            print('mkdir -p {filename}'.format(filename=full_path))

        print('head -c 24 /dev/urandom > {filename}'.format(filename=filename))
        sys.exit(1)
