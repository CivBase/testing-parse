import {React} from 'react';
import {DefaultRoute, Link, Route, RouteHandler} from 'react-router';

import {LoginPage} from '../pages/login';
import {RegisterPage} from '../pages/register';

class LoggedOutRouter extends React.Component {
    render() {
        return (
            <div id="container">
                <div id="main">
                    <RouteHandler {...this.props} />
                </div>
            </div>
        );
    }

    static getRoutes() {
        return (
            <Route name="app" path="/" handler={LoggedOutRouter}>
                <DefaultRoute name="login" path="login" handler={LoginPage} />
                <Route name="register" path="register" handler={RegisterPage} />
            </Route>
        );
    }
}

export default LoggedOutRouter;
