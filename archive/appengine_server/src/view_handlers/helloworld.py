from api.rest.handlers import ViewHandler
from api.rest.template import render_template


class HelloPage(ViewHandler):
    """
    Test page
    """
    def get_view(self, version=None, **kwargs):
        return render_template('hello.html', {'arg1': version})


class GoodbyePage(ViewHandler):
    """
    Another test page
    """
    def get_view(self, version=None, **kwargs):
        return render_template('goodbye.html', {'arg1': version})
