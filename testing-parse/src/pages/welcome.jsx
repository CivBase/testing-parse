import React from 'react';
import {Link} from 'react-router';

import auth from '../common/authentication';

class WelcomePage extends React.Component {
    render() {
        const disabled = auth.getUser() ? '' : 'disabled';
        return (
            <div className="container">
                <h1>Welcome to the prototype!</h1>
                <ul className="nav nav-pills nav-stacked">
                    <li role="presentation"><Link to="/login">login page</Link></li>
                    <li role="presentation"><Link to="/register">register page</Link></li>
                    <li role="presentation" className={disabled}><Link to="/home">home page</Link></li>
                </ul>
            </div>
        );
    }
}

export default WelcomePage;
