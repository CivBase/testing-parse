import React from 'react';
import {DefaultRoute, Link, Route, RouteHandler} from 'react-router';

import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

class LoggedOutRouter extends React.Component {
    render() {
        return (
            <div className="container">
                <RouteHandler {...this.props} />
            </div>
        );
    }

    static getRoutes() {
        return (
            <Route name="app" path="/" handler={LoggedOutRouter}>
                <DefaultRoute name="login" handler={LoginPage} />
                <Route name="register" path="register" handler={RegisterPage} />
            </Route>
        );
    }
}

export default LoggedOutRouter;
