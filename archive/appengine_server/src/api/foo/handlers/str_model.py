import voluptuous as vol

from api.foo.models.str_model import StrModel
from api.rest.handlers import RestedHandler, RestedListHandler
from api.rest.interface import RestInterface


class StrModelHandler(RestedHandler):
    """
    Test singular handler.
    """
    SCHEMA_1_POST = vol.Schema({
        vol.Required('val'): basestring
    })

    INTERFACES = [
        RestInterface('1', methods='GET'),
        RestInterface('1', methods='POST', schema=SCHEMA_1_POST)
    ]

    def get_resource(self, resource_id=None, version=None, projection=None,
                     key_only=None):
        return 'singular get: ' + resource_id

    def create_resource(self, data=None, version=None):
        # return 'singular post: ' + self.request.validated_data.get('val')
        return self.rest_resource(StrModel(data['val']).put())


class StrModelListHandler(RestedListHandler):
    """
    Test list handler.
    """
    INTERFACES = [
        RestInterface('1', methods='GET')
    ]

    def get_resources(self, version=None, limit=100, cursor=None,
                      projection=None, keys_only=False):
        # return 'list get: ' + str(limit) + ', ' + cursor
        projection = projection or []
        models, cursor, more = StrModel.query().fetch(
            limit=limit,
            start_cursor=cursor,
            projection=projection,
            keys_only=keys_only)

        return self.rest_resources(models, cursor, more)
