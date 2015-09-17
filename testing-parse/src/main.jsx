import '../node_modules/babel-core/polyfill';
import {Parse} from 'parse';
import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';

import auth from 'common/authentication';
import history from 'history';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import RootPage from 'pages/root';

Parse.initialize(
    'tdJFpgEza9WzemOR6nu37ATOl3iBIct2APklvOo7',
    'BRdphJDIoKHK0VAAWx9HjRckBKbGEwuW7PrQLEWO'
);

let requireAuth = function(nextState, replaceState) {
    if (!auth.getUser()) {
        replaceState({
            nextPathname: nextState.location.pathname
        }, '/login');
    }
};

React.render((
    <Router history={history}>
        <Route path="/" component={RootPage}>
            <IndexRoute path="login" component={LoginPage} />
            <Route path="register" component={RegisterPage} />
            <Route path="home" component={HomePage} onEnter={requireAuth} />
        </Route>
    </Router>
), document.getElementById('app'));
