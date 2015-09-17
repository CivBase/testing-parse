import React, {findDOMNode} from 'react';
import {Link} from 'react-router';

import auth from '../common/authentication';
import {AuthPage} from '../common/components';
import {extend} from '../common/utils';
import history from '../history';

class LoginPage extends AuthPage {
    renderContent() {
        return (
            <div className="form-auth">
                <div className="container-fluid">
                    <form onSubmit={this.login.bind(this)}>
                        <h3 className="auth-header">Login to an existing account</h3>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="input-email">email</label>
                            <input type="email" className="form-control" id="input-email" placeholder="email" ref="email" />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="input-password">password</label>
                            <input type="password" className="form-control" id="input-password" placeholder="password" ref="password" />
                        </div>
                        <button className="btn brn-lg btn-primary btn-block" type="submit">login</button>
                        <Link to="/register" className="btn brn-lg btn-default btn-block">register</Link>
                    </form>
                </div>
            </div>
        );
    }

    login(event) {
        event.preventDefault();
        let email = findDOMNode(this.refs.email).value;
        let password = findDOMNode(this.refs.password).value;

        auth.login(email, password)
            .then((user) => {
                history.replaceState(null, '/home');
            })
            .catch((user, error) => {
                this.spawnError(error, 'Could not login with the given credentials.');
            });
    }
}

LoginPage.defaultProps = extend(LoginPage.defaultProps, {
    bodyClass: 'alert-page auth-page',
    name: 'login',
    title: 'Login Page'
});

export default LoginPage;
