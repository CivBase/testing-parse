import React from 'react';
import {Link} from 'react-router';

import {getData} from '../common/request';

class LoginPage extends React.Component {
    render() {
        let {title} = this.props.data.home;

        return (
            <div id="login-page">
                <div class="container first">
                    <div class="form-auth">
                        <div class="container-fluid">
                            <h3 class="auth-header">{title}</h3>
                            <div class="form-group">
                                <label class="sr-only" for="input-email">email</label>
                                <input type="email" class="form-control" id="input-email" placeholder="email" />
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="input-password">password</label>
                                <input type="password" class="form-control" id="input-password" placeholder="password" />
                            </div>
                            <button class="btn brn-lg btn-primary btn-block" onclick="">sign in</button>
                            <Link to="register" class="btn brn-lg btn-default btn-block">register</Link>
                        </div>
                    </div>
                </div>

                <div id="alerts" class="container ontop"></div>
            </div>
        );
    }

    static fetchData(params) {
        return getData('/login');
    }
}

export default LoginPage;
