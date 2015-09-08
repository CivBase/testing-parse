import React from 'react';
import {DefaultRoute, Link, Route, RouteHandler} from 'react-router';

import {HomePage} from '../pages/home';

class LoggedInRouter extends React.Component {
    render() {
        return (
            <div className="container">
                <RouteHandler {...this.props} />
            </div>
        );
    }

    static getRoutes() {
        return (
            <Route name="app" path="/" handler={LoggedInRouter}>
                <DefaultRoute name="home" handler={HomePage} />
            </Route>
        );
    }
}

export default LoggedInRouter;
