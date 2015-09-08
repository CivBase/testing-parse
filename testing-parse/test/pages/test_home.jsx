import React from 'react/addons';

import HomePage from '../../src/pages/home/page';

let {TestUtils} = React.addons;

describe('HomePage Component', () => {
    it('should render with data props', () => {
        let data = {
            home: {
                title: 'Test Home Page Title'
            }
        };

        let homePageComponent = TestUtils.renderIntoDocument(<HomePage data={data} />);
        let heading = TestUtils.findRenderedDOMComponentWithTag(homePageComponent, 'h1');

        expect(heading.getDOMNode().textContent).to.equal('Test Home Page Title');
    });
});
