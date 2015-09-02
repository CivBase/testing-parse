import webapp2

from api.rest.constants import BASE_API_URL, RESOURCE_ID_RE


endpoints = [
    webapp2.Route(
        BASE_API_URL + '/StrModel/' + RESOURCE_ID_RE,
        handler='api.foo.handlers.str_model.StrModelHandler'),
    webapp2.Route(
        BASE_API_URL + '/StrModels/',
        handler='api.foo.handlers.str_model.StrModelListHandler')
]
