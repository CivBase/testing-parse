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

export default RootPage;
