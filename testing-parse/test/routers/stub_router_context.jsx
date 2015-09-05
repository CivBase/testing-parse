import React from 'react';

let stubRouterContext = function(Component, props, stubs) {
    let RouterStub = function() {};

    Object.assign(RouterStub, {
        getRouteAtDepth() {},
        setRouteComponentAtDepth() {},
        makePath() {},
        makeHref() {},
        transitionTo() {},
        replaceWith() {},
        goBack() {},
        getCurrentPath() {},
        getCurrentRoutes() {},
        getCurrentPathname() {},
        getCurrentParams() {},
        getCurrentQuery() {},
        isActive() {}
    }, stubs);

    return React.createClass({
        childContextTypes: {
            router: React.PropTypes.func,
            routeDepth: React.PropTypes.number
        },

        getChildContext() {
            return {
                router: RouterStub,
                routeDepth: 1
            };
        },

        render() {
            return (
                <Component {...props} />
            );
        }
    });
};

export default stubRouterContext;
