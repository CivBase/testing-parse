import webapp2

from api.foo.urls import endpoints as foo_endpoints


# view endpoints
endpoints = [
    webapp2.Route(
        '/',
        handler='view_handlers.helloworld.HelloPage'),
    webapp2.Route(
        '/goodbye/',
        handler='view_handlers.helloworld.GoodbyePage')
]

# api endpoints
endpoints += foo_endpoints

application = webapp2.WSGIApplication(endpoints, debug=True)
