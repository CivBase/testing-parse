VERSION_RE = '<version:(\d+|latest)>'
BASE_API_URL = '/api/{version}'.format(version=VERSION_RE)
RESOURCE_ID_RE = '<resource_id:([^/]+)>'
