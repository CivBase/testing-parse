import React from 'react';

class RootPage extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

RootPage.propTypes = {
    children: React.PropTypes.list
};

export default RootPage;
