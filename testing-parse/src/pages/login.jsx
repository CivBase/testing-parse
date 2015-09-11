import React from 'react';
import {Link} from 'react-router';

import * as auth from '../common/authentication';
import {AuthPage} from '../common/components';
import {extend} from '../common/utils';

class LoginPage extends AuthPage {
    renderContent() {
        return (
            <div className="form-auth">
                <div className="container-fluid">
                    <h3 className="auth-header">Login to an existing account</h3>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="input-email">email</label>
                        <input type="email" className="form-control" id="input-email" placeholder="email" />
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="input-password">password</label>
                        <input type="password" className="form-control" id="input-password" placeholder="password" />
                    </div>
                    <button className="btn brn-lg btn-primary btn-block" onClick={this.login.bind(this)}>sign in</button>
                    <Link to="register" className="btn brn-lg btn-default btn-block">register</Link>
                </div>
            </div>
        );
    }

    login() {
        let email = document.getElementById('input-email').value;
        let password = document.getElementById('input-password').value;

        auth.login(email, password)
            .then((user) => {
                this.transitionTo('home');
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
