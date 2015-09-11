import {Parse} from 'parse';
import React from 'react';
import {Link} from 'react-router';

import * as auth from '../common/authentication';
import {AuthPage} from '../common/components';
import {extend} from '../common/utils';

class RegisterPage extends AuthPage {
    renderContent() {
        return (
            <div id="login-page">
                <div className="container first">
                    <div className="form-auth">
                        <div className="container-fluid">
                            <h3 className="auth-header">Register for a new account</h3>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="input-email">email</label>
                                <input type="email" className="form-control" id="input-email" placeholder="email" />
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="input-password">password</label>
                                <input type="password" className="form-control" id="input-password" placeholder="password" />
                            </div>
                            <button className="btn brn-lg btn-primary btn-block" onClick={this.register.bind(this)}>register</button>
                            <Link to="login" className="btn brn-lg btn-default btn-block">login</Link>
                        </div>
                    </div>
                </div>

                <div id="alerts" className="container ontop"></div>
            </div>
        );
    }

    register() {
        let email = document.getElementById('input-email').value;
        let password = document.getElementById('input-password').value;

        auth.register(email, password)
            .then((user) => {
                this.transitionTo('home');
            })
            .catch((user, error) => {
                this.spawnError(error, 'Could not create an account with the given credentials.');
            });
    }
}

RegisterPage.defaultProps = extend(RegisterPage.defaultProps, {
    bodyClass: 'alert-page auth-page',
    name: 'register',
    title: 'Register Page'
});

export default RegisterPage;
