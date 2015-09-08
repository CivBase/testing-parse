import '../node_modules/babel-core/polyfill';
import React from 'react';
import Router from 'react-router';
import Parse from 'parse';

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

let fetchData = function(stateRoutes, params) {
    let data = {};

    return Promise.all(stateRoutes
        .filter((route) => route.handler.fetchData)
        .map((route) => {
            return route.handler
                .fetchData(params)
                .then((response) => {
                    data[route.name] = response;
                });
        })
    ).then(() => data);
};

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    fetchData(state.routes, state.params)
        .then((data) => {
            React.render(<Handler data={data} />, document.getElementById('app'));
        });
});
