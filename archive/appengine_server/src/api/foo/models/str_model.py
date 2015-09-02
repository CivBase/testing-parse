from google.appengine.ext import ndb


class StrModel(ndb.Model):
    """
    Test model.
    """
    val = ndb.StringProperty(required=True)
