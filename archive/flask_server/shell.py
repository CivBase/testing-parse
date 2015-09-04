"""
Start a shell to interact with the database.
"""
#!/usr/bin/env python
import os
from pprint import pprint

from flask import *
from app import *


os.environ['PYTHONINSPECT'] = 'True'
