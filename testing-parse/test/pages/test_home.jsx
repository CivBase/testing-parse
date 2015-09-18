import React from 'react/addons';

import HomePage from '../../src/pages/home/page';

const {TestUtils} = React.addons;

describe('HomePage Component', () => {
    it('should render with data props', () => {
        const data = {
            home: {
                title: 'Test Home Page Title'
            }
        };

        const homePageComponent = TestUtils.renderIntoDocument(<HomePage data={data} />);
        const heading = TestUtils.findRenderedDOMComponentWithTag(homePageComponent, 'h1');

        expect(heading.getDOMNode().textContent).to.equal('Test Home Page Title');
    });
});
