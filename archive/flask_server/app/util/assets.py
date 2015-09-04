"""
Asset management resources.
"""
from flask.ext.assets import Bundle, Environment


def register_assets(app):
    """
    Creates minified assets in the /static/gen directory which can be injected
    into jinja2 templates.
    """
    assets = Environment(app)

    dist = 'dist/'
    styles = 'styles/'
    vendor = 'vendor/'
    bootstrap = vendor + 'bootstrap-3.3.1/'
    metismenu = vendor + 'metisMenu-1.1.3/'
    react = vendor + 'react-0.12.2/'
    sb_admin_2 = vendor + 'sb-admin-2-1.0.5/'

    assets.register({
        'bootstrap_css': Bundle(
            bootstrap + 'css/bootstrap.min.css',
            # bootstrap + 'css/bootstrap-theme.min.css',
            output='gen/bootstrap.min.css',
            filters='cssmin'
        ),
        'sb_admin_2_css': Bundle(
            sb_admin_2 + 'css/sb-admin-2.css',
            sb_admin_2 + 'css/timeline.css',
            metismenu + 'metisMenu.min.css',
            output='gen/sb_admin_2.min.css',
            filters='cssmin'
        ),
        'forms_css': Bundle(
            styles + 'forms.css',
            output='gen/forms.min.css',
            filters='cssmin'
        ),
        'global_css': Bundle(
            styles + 'global.css',
            output='gen/global.min.css',
            filters='cssmin'
        ),
        'tables_css': Bundle(
            styles + 'tables.css',
            output='gen/tables.min.css',
            filters='cssmin'
        ),
        'jquery_js': Bundle(
            vendor + 'jquery-2.1.1.min.js',
            output='gen/jquery.min.js',
            filters='jsmin'
        ),
        'bootstrap_js': Bundle(
            bootstrap + 'js/bootstrap.min.js',
            output='gen/bootstrap.min.js',
            filters='jsmin'
        ),
        'sb_admin_2_js': Bundle(
            sb_admin_2 + 'js/sb-admin-2.js',
            metismenu + 'metisMenu.min.js',
            output='gen/sb_admin_2.min.js',
            filters='jsmin'
        ),
        'react_js': Bundle(
            react + 'react.js',
            react + 'JSXTransformer.js',
            output='gen/react.min.js',
            filters='jsmin'
        ),
        'foo_js': Bundle(
            vendor + 'jquery.form.min.js',
            dist + 'foo.min.js',
            output='gen/foo.min.js',
            filters='jsmin'
        )
    })
