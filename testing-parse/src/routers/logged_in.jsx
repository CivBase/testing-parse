import React from 'react';
import {DefaultRoute, Link, Route, RouteHandler} from 'react-router';

import HomePage from '../pages/home';

class LoggedInRouter extends React.Component {
    render() {
        return (
            <div id="container">
                <div id="navigation">
                    <header>
                        <ul>
                            <li><Link to="home">Home</Link></li>
                        </ul>
                    </header>
                </div>

                <div id="main">
                    <RouteHandler {...this.props} />
                </div>
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
