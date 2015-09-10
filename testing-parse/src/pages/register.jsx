import $ from 'jquery';
import {Parse} from 'parse';
import React from 'react';
import {Link} from 'react-router';

import * as auth from '../common/authentication';
import {AuthPage} from '../common/components';

class RegisterPage extends AuthPage {
    renderContent() {
        this.name = 'register';
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
                            <Link to="login" className="btn brn-lg btn-default btn-block">sign in</Link>
                        </div>
                    </div>
                </div>

                <div id="alerts" className="container ontop"></div>
            </div>
        );
    }

    register() {
        let email = $('#input-email').val();
        let password = $('#input-password').val();

        auth.register(email, password)
            .then((user) => {
                this.transitionTo('/home');
            })
            .catch((user, error) => {
                this.spawnError(error);
            });
    }
}

export default RegisterPage;
