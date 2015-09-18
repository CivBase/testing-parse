import React from 'react/addons';
import {RouteHandler} from 'react-router';

import stubRouterContext from './stub_router_context';
import LoggedOutRouter from '../../src/routers/logged_out';

const {TestUtils} = React.addons;

describe('LoggedOut Router', () => {
    let loggedOutRouterComponent;

    beforeEach(() => {
        const StubbedLoggedOutRouter = stubRouterContext(LoggedOutRouter);
        loggedOutRouterComponent = TestUtils.renderIntoDocument(<StubbedLoggedOutRouter />);
    });

    it('should return routes', () => {
        const routes = LoggedOutRouter.getRoutes();

        expect(routes).to.exist();
    });

    it('should include <RouterHandler> component', () => {
        const handler = TestUtils.findRenderedComponentWithType(loggedOutRouterComponent, RouteHandler);

        expect(handler).to.exist();
    });
});
