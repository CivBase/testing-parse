import datetime
import inspect

from google.appengine.ext import ndb


class RestInterface():
    """
    Denotes the schema and rest rules associated with a rest API version and
    HTTP method.
    """
    def __init__(self, version, methods, schema=None, rules=None):
        """
        @param version: API version to associate with (number or 'latest')
        @type  version: int or basestring
        @param methods: HTTP methods to associate with (GET, POST, PUT, and/or
                        DELETE)
        @type  methods: basestring or list of basestrings
        @param schema: rules for validating data for the associated API requests
        @type  schema: voluptuous.Schema
        @param rules: rest rules to be used when constructing rested resources
                      for associated GET, PUT, and DELETE requests
        @type  rules: dict mapping models to lists of strings or RestRule
                      instances
        """
        if not isinstance(methods, list):
            methods = [methods]

        self.version = str(version)
        self.methods = [m.upper() for m in methods]
        self.schema = schema
        self.rules = rules


class RestRule():
    """
    Denotes conversion information for a rest resource attribute.
    """
    def __init__(self, attribute, name=None, handler=None):
        self.attribute = attribute
        self.name = name or attribute
        self.handler = handler or self.urlsafe

    @staticmethod
    def urlsafe(value):
        """
        Standard json-friendly conversion handler for rest resource attributes.

        @param value: attribute to be converted
        @return: json-friendly "representation" of the attribute
        """
        if (isinstance(value, datetime.date) or
                isinstance(value, datetime.time)):
            return value.isoformat()

        if isinstance(value, ndb.Key):
            return value.urlsafe()

        if isinstance(value, list):
            return [RestRule.urlsafe(v) for v in value]

        if isinstance(value, set):
            return {RestRule.urlsafe(v) for v in value}

        if isinstance(value, ndb.Model):
            value_dict = value.to_dict()
            value_dict['key'] = value.key.urlsafe()
            value = value_dict

        elif inspect.isclass(value):
            value_dict = {}
            for k, v in vars(value).iteritems():
                if not (callable(v) or k.startswith('_')):
                    value_dict[k] = v

            value = value_dict

        if isinstance(value, dict):
            return {RestRule.urlsafe(k): RestRule.urlsafe(v)
                    for k, v in value.iteritems()}

        return str(value)
