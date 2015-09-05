import React from 'react/addons';
import {RouteHandler} from 'react-router';

import stubRouterContext from './stub_router_context';
import LoggedInRouter from '../../src/routers/logged_in';

let {TestUtils} = React.addons;

describe('LoggedIn Router', () => {
    let loggedInRouterComponent;

    beforeEach(() => {
        let StubbedLoggedInRouter = stubRouterContext(LoggedInRouter);
        loggedInRouterComponent = TestUtils.renderIntoDocument(<StubbedLoggedInRouter />);
    });

    it('should return routes', () => {
        let routes = LoggedInRouter.getRoutes();

        expect(routes).to.exist();
    });

    it('should render with anchor tag in navigation', () => {
        let link = TestUtils.findRenderedDOMComponentWithTag(loggedInRouterComponent, 'a');

        expect(link.getDOMNode().textContent).to.equal('Home');
    });

    it('should include <RouterHandler> component', () => {
        let handler = TestUtils.findRenderedComponentWithType(loggedInRouterComponent, RouteHandler);

        expect(handler).to.exist();
    });
});
