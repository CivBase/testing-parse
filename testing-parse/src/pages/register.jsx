import React from 'react';
import {Link} from 'react-router';

import {getData} from '../common/request';

class LoginPage extends React.Component {
    render() {
        return (
            <div id="login-page">
                <div className="container first">
                    <div className="form-auth">
                        <div className="container-fluid">
                            <h3 className="auth-header">Test</h3>
                            <div className="form-group">
                                <label className="sr-only" for="input-email">email</label>
                                <input type="email" className="form-control" id="input-email" placeholder="email" />
                            </div>
                            <div className="form-group">
                                <label className="sr-only" for="input-password">password</label>
                                <input type="password" className="form-control" id="input-password" placeholder="password" />
                            </div>
                            <button className="btn brn-lg btn-primary btn-block" onclick="">register</button>
                            <Link to="login" className="btn brn-lg btn-default btn-block">sign in</Link>
                        </div>
                    </div>
                </div>

                <div id="alerts" className="container ontop"></div>
            </div>
        );
    }

    static fetchData(params) {
        return getData('/register');
    }
}

export default LoginPage;
