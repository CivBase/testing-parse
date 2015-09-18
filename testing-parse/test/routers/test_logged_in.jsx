import React from 'react/addons';
import {RouteHandler} from 'react-router';

import stubRouterContext from './stub_router_context';
import LoggedInRouter from '../../src/routers/logged_in';

const {TestUtils} = React.addons;

describe('LoggedIn Router', () => {
    let loggedInRouterComponent;

    beforeEach(() => {
        const StubbedLoggedInRouter = stubRouterContext(LoggedInRouter);
        loggedInRouterComponent = TestUtils.renderIntoDocument(<StubbedLoggedInRouter />);
    });

    it('should return routes', () => {
        const routes = LoggedInRouter.getRoutes();

        expect(routes).to.exist();
    });

    it('should render with anchor tag in navigation', () => {
        const link = TestUtils.findRenderedDOMComponentWithTag(loggedInRouterComponent, 'a');

        expect(link.getDOMNode().textContent).to.equal('Home');
    });

    it('should include <RouterHandler> component', () => {
        const handler = TestUtils.findRenderedComponentWithType(loggedInRouterComponent, RouteHandler);

        expect(handler).to.exist();
    });
});
