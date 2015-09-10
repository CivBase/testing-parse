import '../node_modules/babel-core/polyfill';
import {Parse} from 'parse';
import React from 'react';
import Router from 'react-router';

import LoggedInRouter from 'routers/logged_in';
import LoggedOutRouter from 'routers/logged_out';

Parse.initialize(
    'tdJFpgEza9WzemOR6nu37ATOl3iBIct2APklvOo7',
    'BRdphJDIoKHK0VAAWx9HjRckBKbGEwuW7PrQLEWO'
);

// initialize routes depending on session
let routes;
if (Parse.User.current()) {
    routes = LoggedInRouter.getRoutes();
}
else {
    routes = LoggedOutRouter.getRoutes();
}

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Handler />, document.getElementById('app'));
});
