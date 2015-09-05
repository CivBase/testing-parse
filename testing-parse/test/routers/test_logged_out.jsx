import React from 'react/addons';
import {RouteHandler} from 'react-router';

import stubRouterContext from './stub_router_context';
import LoggedOutRouter from '../../src/routers/logged_out';

let {TestUtils} = React.addons;

describe('LoggedOut Router', () => {
    let loggedOutRouterComponent;

    beforeEach(() => {
        let StubbedLoggedOutRouter = stubRouterContext(LoggedOutRouter);
        loggedOutRouterComponent = TestUtils.renderIntoDocument(<StubbedLoggedOutRouter />);
    });

    it('should return routes', () => {
        let routes = LoggedOutRouter.getRoutes();

        expect(routes).to.exist();
    });

    it('should include <RouterHandler> component', () => {
        let handler = TestUtils.findRenderedComponentWithType(loggedOutRouterComponent, RouteHandler);

        expect(handler).to.exist();
    });
});
