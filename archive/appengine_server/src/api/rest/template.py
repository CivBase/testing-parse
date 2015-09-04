import jinja2
import os

# path to the views directory
TEMPLATE_LOCATION = os.path.normpath(os.path.join(
    os.path.dirname(__file__), '..', '..', 'angular', 'views'))

# jinja2 environment and rules for template rendering
ENVIRONMENT = jinja2.Environment(loader=jinja2.FileSystemLoader(
    searchpath=TEMPLATE_LOCATION), variable_start_string='{$',
    variable_end_string='$}')


def render_template(template_file, template_vars=None):
    """
    Renders a jinja2 template with the given file and parameters.

    @param template_file: name of the template file in the view directory
    @type  template_file: basestring
    @param template_vars: parameters to use when rendering the template
    @type  template_vars: dict
    """
    template = ENVIRONMENT.get_template(template_file)
    if template_vars is None:
        template_vars = {}

    return template.render(template_vars)
