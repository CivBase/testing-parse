import React, {findDOMNode} from 'react';
import {Link} from 'react-router';

import auth from '../common/authentication';
import {AuthPage} from '../common/components';
import {extend} from '../common/utils';
import history from '../history';

class RegisterPage extends AuthPage {
    componentWillMount() {
        if (auth.getUser()) {
            history.pushState(null, '/home');
        }

        super.componentWillMount();
    }

    renderContent() {
        return (
            <div className="form-auth">
                <div className="container-fluid">
                    <form onSubmit={this.register.bind(this)}>
                        <h3 className="auth-header">Register for a new account</h3>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="input-email">email</label>
                            <input type="email" className="form-control" id="input-email" placeholder="email" ref="email" />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="input-password">password</label>
                            <input type="password" className="form-control" id="input-password" placeholder="password" ref="password" />
                        </div>
                        <button className="btn brn-lg btn-primary btn-block" type="submit">register</button>
                        <Link to="/" className="btn brn-lg btn-default btn-block">login</Link>
                    </form>
                </div>
            </div>
        );
    }

    register(event) {
        event.preventDefault();
        let email = findDOMNode(this.refs.email).value;
        let password = findDOMNode(this.refs.password).value;

        auth.register(email, password)
            .then((user) => {
                history.pushState(null, '/home');
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
