import json
import urlparse
import webapp2

import voluptuous as vol
from google.appengine.datastore.datastore_query import Cursor
from google.appengine.ext import ndb

import api.rest.validators as val
from api.rest.interface import RestRule


class BaseRestedHandler(webapp2.RequestHandler):
    """
    A webapp handler which supports simple validation using voluptuous schema
    and rest resource conversion with optional support for custom RestRules.
    Only NDB models are supported by the rest rules. This should be considered
    an abstract class to be built upon but never instantiated.
    """
    def get_schema(self):
        """
        @return: voluptuous schema to be used to validate POST and PUT request
                 body content (data)
        @rtype: voluptuous schema instance
        """
        raise NotImplementedError("You must define get_schema to validate data")

    def get_rules(self):
        """
        @return: rest rules to be used when constructing rested resources for
                 GET, PUT, and DELETE requests
        @rtype: dict mapping models to lists of strings or RestRule instances
        """
        raise NotImplementedError("You must define get_schema to validate data")

    def _validate_query(self, route_args, schema):
        """
        Parses and validates parameters given in the url and stores the
        validated query in the request instance.

        @param route_args: arguments which have already been parsed by the
                           webapp routes
        @type  route_args: dict
        @param schema: voluptuous schema used to validate query parameters
        @type  schema: voluptuous.Schema
        @return: validated query parameters
        @rtype: dict
        """
        parsed = urlparse.parse_qs(self.request.query_string)
        query = dict([(k, v[0]) for k, v in parsed.iteritems()] +
                     route_args.items())

        try:
            self.request.validated_query = schema(query)
            return self.request.validated_query

        except vol.Invalid, vol.SchemaError:
            self.abort(400)

    def _validate_data(self):
        """
        Parses and validates parameters given in the request body and stores the
        validated data in the request instance. Uses the schema provided by
        get_schema().

        @return: validated data parameters
        @rtype: dict
        """
        data = {}
        for arg in self.request.arguments():
            value = self.request.get_all(arg)
            if len(value) == 0:
                data[arg] = None
                continue

            if len(value) == 1:
                data[arg] = value[0]
                continue

            data[arg] = value

        try:
            self.request.validated_data = self.get_schema()(data)
            return self.request.validated_data

        except vol.Invalid, vol.SchemaError:
            self.abort(400)

    def _rest_resource(self, resource):
        """
        Converts a resource into a its json-friendly "representation". If
        rest rules are not provided by get_rules(), all of the resource's
        attributes are provided in the representation. Otherwise, only the
        attributes explicitly specified by the rules are provided.

        Attributes described by a basestring are converted using the standard
        RestRule.urlsafe handler.

        Attributes described by a RestRule instance are be created using the
        designated name and handler. If a name is not provided, the attribute
        name is used. If a handler is not provided to make the attribute
        json-friendly, the standard RestRule.urlsafe handler is used instead.

        @param resource: the object to convert
        @type  resource: ndb.Model or ndb.Key instance
        @return: a json-friendly dictionary with key-value pairs representing
                 the attributes of the resource (aka: the resource's
                 "representation")
        @rtype: dict
        """
        if isinstance(resource, ndb.Key):
            return resource.urlsafe()

        if not isinstance(resource, ndb.Model):
            raise ValueError("Unable to convert to rest resource")

        try:
            rules = self.get_rules()

        except NotImplementedError:
            rules = None

        if rules is None or resource.__class__ not in rules:
            rested_properties = RestRule.urlsafe(resource)
            return json.dumps(rested_properties)

        rested_properties = {}
        for attr_rule in rules:
            if (isinstance(attr_rule, basestring) and
                    hasattr(resource, attr_rule)):
                rested_properties[attr_rule] = RestRule.urlsafe(
                    getattr(resource, attr_rule))
                continue

            if (attr_rule.handler is None and
                    hasattr(resource, attr_rule.attribute)):
                rested_properties[attr_rule.name] = RestRule.urlsafe(
                    getattr(resource, attr_rule.attribute))
                continue

            rested_properties[attr_rule.name] = attr_rule.handler(
                getattr(resource, attr_rule.attribute))

        rested_properties['key'] = resource.key.urlsafe()
        return rested_properties


class RestedAPIHandler(BaseRestedHandler):
    """
    A rested webapp handler which uses RestInterfaces to select schema and rest
    rules for different methods and versions. All applicable interfaces should
    be defined in the INTERFACES list constant associated with the handler.
    """
    INTERFACES = []

    def __init__(self, *args, **kwargs):
        super(RestedAPIHandler, self).__init__(*args, **kwargs)

        self.interface = None
        self.interfaces = {}
        for interface in self.INTERFACES:
            for method in interface.methods:
                if interface.version not in self.interfaces:
                    self.interfaces[interface.version] = {}

                self.interfaces[interface.version][method] = {
                    'schema': interface.schema,
                    'rules': interface.rules
                }

        latest = str(max(int(version) for version in self.interfaces.keys()))
        self.interfaces['latest'] = self.interfaces[latest]

    def _set_interface(self, method, version):
        """
        Selects the interface specified by the given method and version and
        stores it in the request instance.

        @param method: HTTP method being requested
        @type  method: basestring
        @param version: API version being requested
        @type  version: basestring
        """
        try:
            self.request.interface = self.interfaces[version][method]

        except KeyError:
            self.abort(405)

    def get_schema(self):
        """
        Selects the schema instance from the current interface.
        """
        return self.request.interface.get('schema')

    def get_rules(self):
        """
        Selects the rest rules dictionary from the current interface.
        """
        return self.request.interface.get('rules')


class RestedHandler(RestedAPIHandler):
    """
    A rested API handler which interacts with single NDB model instances via
    GET, POST, PUT, and DELETE requests. Interfaces must be defined to denote
    custom schema validation and rest rules for each method and version.
    """
    def rest_resource(self, resource):
        """
        Converts a resource into its json-friendly representation.

        @param resource:
        @type  resource: ndb model or key
        @return: the specified resource's representation
        @rtype: dict
        """
        return self._rest_resource(resource)

    def get(self, **kwargs):
        """
        Handles GET requests. Writes the jsonified output of get_resource to the
        response object.

        @param resource_id: identifier for the NDB model instance (usually a
                            urlsafe key)
        @type  resource_id: basestring
        @param version: version of the API (number or "latest")
        @type  version: basestring
        @return: json stringified rest resource

        Other query arguments include
        projection: a list of strings denoting which attributes should be
                    included in the resource's representation
        key_only: a boolean which denotes that only the resource's key should be
                  returned if true
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Required('resource_id'): basestring,
            vol.Required('version'): basestring,
            vol.Optional('projection'): val.Coerce(val.List(basestring)),
            vol.Optional('key_only'): vol.Boolean()
        }, extra=False))

        self._set_interface('GET', query['version'])
        resource = self.get_resource(**query)
        self.response.write(json.dumps(resource))

    def get_resource(self, resource_id=None, version=None, projection=None,
                     key_only=None):
        """
        Retrieves a rest resource using the given resource id. This must be
        implemented for any RestedHandler API which supports GET requests.

        @param resource_id: identifier used to designate which resource should
                            be retrieved (usually a urlsafe key)
        @type  resource_id: basestring
        @param version: version of the API to be used
        @type  version: basestring
        @param projection: a subset of attributes to be returned from the rested
                           resource (all attributes are returned if a projection
                           is not specified)
        @type  projection: list of strings
        @param key_only: when true, specifies that only the resource's ndb key
                         should be returned (overrides a projection)
        @type  key_only: boolean
        @return:
        @rtype:
        """
        raise NotImplementedError(
            "You must define get_resource for GET requests")

    def post(self, **kwargs):
        """
        Handles POST requests. Writes the jsonified output of create_resource to
        the response object.

        @param resource_id: identifier for the NDB model instance (usually a
                            urlsafe key)
        @type  resource_id: basestring
        @param version: version of the API (number or "latest")
        @type  version: basestring
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Required('version'): basestring
        }, extra=False))

        self._set_interface('POST', query['version'])
        data = self._validate_data()
        resource = self.create_resource(data=data, **query)
        self.response.write(json.dumps(resource))

    def create_resource(self, data=None, version=None):
        """
        Creates a new resource using the given data. This must be implemented
        for any RestedHandler API which supports POST requests.

        @param data: parameters provided in the request body
        @type  data: dict
        @param version: version of the API to be used
        @type  version: basestring
        @return:
        @rtype:
        """
        raise NotImplementedError(
            "You must define create_resource for POST requests")

    def put(self, **kwargs):
        """
        Handles PUT requests. Writes the jsonified output of update_resource to
        the response object.

        @param resource_id: identifier for the NDB model instance (usually a
                            urlsafe key)
        @type  resource_id: basestring
        @param version: version of the API (number or "latest")
        @type  version: basestring
        @return: json stringified rest resource

        Other query arguments include
        projection: a list of strings denoting which attributes should be
                    included in the resource's representation
        key_only: a boolean which denotes that only the resource's key should be
                  returned if true
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Required('resource_id'): basestring,
            vol.Required('version'): basestring,
            vol.Optional('projection'): val.Coerce(val.List(basestring)),
            vol.Optional('key_only'): vol.Boolean()
        }, extra=False))

        self._set_interface('PUT', query['version'])
        data = self._validate_data()
        resource = self.update_resource(data=data, **query)
        self.response.write(json.dumps(resource))

    def update_resource(
            self, data=None, resource_id=None, version=None, projection=None,
            key_only=None):
        """
        Modifies a resource designated by the given resource id using the given
        data. This must be implemented for any RestedHandler API which supports
        PUT requests.

        @param data: parameters provided in the request body
        @type  data: dict
        @param resource_id: identifier used to designate which resource should
                            be modified (usually a urlsafe key)
        @type  resource_id: basestring
        @param version: version of the API to be used
        @type  version: basestring
        @param projection: a subset of attributes to be returned from the rested
                           resource (all attributes are returned if a projection
                           is not specified)
        @type  projection: list of strings
        @param key_only: when true, specifies that only the resource's ndb key
                         should be returned (overrides a projection)
        @type  key_only: boolean
        @return:
        @rtype:
        """
        raise NotImplementedError(
            "You must define update_resource for PUT requests")

    def delete(self, **kwargs):
        """
        Handles DELETE requests. Writes the jsonified output of remove_resource
        to the response object.

        @param resource_id: identifier for the NDB model instance (usually a
                            urlsafe key)
        @type  resource_id: basestring
        @param version: version of the API (number or "latest")
        @type  version: basestring
        @return: json stringified rest resource

        Other query arguments include
        projection: a list of strings denoting which attributes should be
                    included in the resource's representation
        key_only: a boolean which denotes that only the resource's key should be
                  returned if true
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Required('resource_id'): basestring,
            vol.Required('version'): basestring,
            vol.Optional('projection'): val.Coerce(val.List(basestring)),
            vol.Optional('key_only'): vol.Boolean()
        }, extra=False))

        self._set_interface('DELETE', query['version'])
        resource = self.remove_resource(**query)
        self.response.write(json.dumps(resource))

    def remove_resource(self, resource_id=None, version=None, projection=None,
                        key_only=None):
        """
        Removes a resource designated by the given resource id. This must be
        implemented for any RestedHandler API which supports DELETE requests.

        @param resource_id: identifier used to designate which resource should
                            be removed (usually a urlsafe key)
        @type  resource_id: basestring
        @param version: version of the API to be used
        @type  version: basestring
        @param projection: a subset of attributes to be returned from the rested
                           resource (all attributes are returned if a projection
                           is not specified)
        @type  projection: list of strings
        @param key_only: when true, specifies that only the resource's ndb key
                         should be returned (overrides a projection)
        @type  key_only: boolean
        @return:
        @rtype:
        """
        raise NotImplementedError(
            "You must define remove_resource for DELETE requests")


class RestedListHandler(RestedAPIHandler):
    """
    A rested API handler which interacts with multiple NDB model instances via
    GET, POST, PUT, and DELETE requests. Interfaces must be defined to denote
    custom schema validation and rest rules for each method and version.
    """
    def rest_resources(self, resources, cursor=None, more=None):
        """
        Converts a group of resources into their json-friendly representations.

        @param resources:
        @type  resources: list of ndb models or keys
        @param cursor:
        @type  cursor: database_query.Cursor
        @param more:
        @type  more: bool
        @return: a dict containing resource representations and (if given) a
                 cursor
        @rtype: dict
        """
        results = {
            'results': [self._rest_resource(r) for r in resources]
        }

        if cursor is not None:
            results['next'] = (cursor.urlsafe() if isinstance(cursor, Cursor)
                               else str(cursor))

        if more is not None:
            results['more'] = bool(more)

        return results

    def get(self, **kwargs):
        """
        Handles GET requests. Writes the jsonified output of get_resources to
        the response object.

        @param version: version of the API (number or "latest")
        @type  version: basestring
        @return: json stringified dict containing rest resources and a cursor

        Other query arguments include
        limit: the number of resources to return (batch size)
        cursor: a database "location" (used for simultaneous batch requests)
        projection: a list of strings denoting which attributes should be
                    included in the resources' representations
        keys_only: a boolean which denotes that only the resources' keys
                   should be returned if true
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Required('version'): basestring,
            vol.Optional('limit'): val.Coerce(int),
            vol.Optional('cursor'): basestring,
            vol.Optional('projection'): val.Coerce(val.List(basestring)),
            vol.Optional('keys_only'): vol.Boolean()
        }, extra=False))

        resources = self.get_resources(**query)
        self.response.write(json.dumps(resources))

    def get_resources(self, version=None, limit=None, cursor=None,
                      projection=None, keys_only=None):
        """
        Retrieves a group of rest resources. This must be implemented for any
        RestedListHandler API which supports GET requests.

        @param version: version of the API to be used
        @type  version: basestring
        @param limit: size of the database query
        @type  limit: int
        @param cursor: location in the database to being querying from
        @type  cursor: basestring
        @param projection: a subset of attributes to be returned from the rested
                           resources (all attributes are returned if a
                           projection is not specified)
        @type  projection: list of strings
        @param keys_only: when true, specifies that only the resources' ndb keys
                          should be returned (overrides a projection)
        @type  keys_only: boolean
        @return:
        @rtype:
        """
        raise NotImplementedError(
            "You must define get_resources for GET requests")

    def post(self, **kwargs):
        """
        Handles POST requests. Writes the jsonified output of create_resources
        to the response object.

        @param version: version of the API (number or "latest")
        @type  version: basestring
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Required('version'): basestring
        }, extra=False))

        data = self._validate_data()
        resource = self.create_resources(data=data, **query)
        self.response.write(json.dumps(resource))

    def create_resources(self, data=None, version=None):
        """
        Creates new resources using the given data. This must be implemented
        for any RestedListHandler API which supports POST requests.

        @param data: parameters provided in the request body
        @type  data: dict
        @param version: version of the API to be used
        @type  version: basestring
        @return:
        @rtype:
        """
        raise NotImplementedError(
            "You must define create_resources for POST requests")

    def put(self, **kwargs):
        """
        Handles PUT requests. Writes the jsonified output of update_resources to
        the response object.

        @param version: version of the API (number or "latest")
        @type  version: basestring
        @return: json stringified dict containing rest resources

        Other query arguments include
        projection: a list of strings denoting which attributes should be
                    included in the resources' representations
        keys_only: a boolean which denotes that only the resources' keys
                   should be returned if true
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Required('version'): basestring,
            vol.Optional('projection'): val.Coerce(val.List(basestring)),
            vol.Optional('keys_only'): vol.Boolean()
        }, extra=False))

        data = self._validate_data()
        resources = self.update_resources(data=data, **query)
        self.response.write(json.dumps(resources))

    def update_resources(self, data=None, version=None, projection=None,
                         keys_only=None):
        """
        Modifies resources using the given data. This must be implemented for
        any RestedListHandler API which supports PUT requests.

        @param version: version of the API to be used
        @type  version: basestring
        @param projection: a subset of attributes to be returned from the rested
                           resources (all attributes are returned if a
                           projection is not specified)
        @type  projection: list of strings
        @param keys_only: when true, specifies that only the resources' ndb keys
                          should be returned (overrides a projection)
        @type  keys_only: boolean
        @return:
        @rtype:
        """
        raise NotImplementedError(
            "You must define update_resources for PUT requests")

    def delete(self, **kwargs):
        """
        Handles DELETE requests. Writes the jsonified output of remove_resources
        to the response object.

        @param version: version of the API (number or "latest")
        @type  version: basestring
        @return: json stringified dict containing rest resources

        Other query arguments include
        limit: the number of resources to delete (batch size)
        projection: a list of strings denoting which attributes should be
                    included in the resources' representations
        keys_only: a boolean which denotes that only the resources' keys
                   should be returned if true
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Required('version'): basestring,
            vol.Optional('limit'): val.Coerce(int),
            vol.Optional('projection'): val.Coerce(val.List(basestring)),
            vol.Optional('keys_only'): vol.Boolean()
        }, extra=False))

        resources = self.remove_resources(**query)
        self.response.write(json.dumps(resources))

    def remove_resources(self, version=None, limit=None, projection=None,
                         keys_only=None):
        """
        Removes some amount of resources. This must be implemented for any
        RestedListHandler API which supports DELETE requests.

        @param version: version of the API to be used
        @type  version: basestring
        @param limit: number of resource to be removed
        @type  limit: int
        @param projection: a subset of attributes to be returned from the rested
                           resources (all attributes are returned if a
                           projection is not specified)
        @type  projection: list of strings
        @param keys_only: when true, specifies that only the resources' ndb keys
                          should be returned (overrides a projection)
        @type  keys_only: boolean
        @return:
        @rtype:
        """
        raise NotImplementedError(
            "You must define remove_resources for DELETE requests")


class ViewHandler(BaseRestedHandler):
    """
    A rested webapp handler for addressing page GET requests.
    """
    def get(self, **kwargs):
        """
        Other query arguments include
        version: version of the API (number or "latest")
        """
        query = self._validate_query(kwargs, vol.Schema({
            vol.Optional('version'): basestring,
        }, extra=True))

        self.response.write(self.get_view(**query))

    def get_view(self, version=None, **kwargs):
        """
        Constructs an HTML page.

        @param version: version of the view to be used
        @type  version: basestring
        @return: an HTML page
        @rtype: basestring
        """
        raise NotImplementedError(
            "You must define get_view for view requests")
