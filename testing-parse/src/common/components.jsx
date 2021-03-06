import $ from 'jquery';
import React from 'react';
import {Link} from 'react-router';

import auth from '../common/authentication';
import {extend} from '../common/utils';
import history from '../history';

let alertId = 0;

class Alert extends React.Component {
    render() {
        return (
            <div className={'alert alert-' + this.props.alertType + ' alert-dismissible'} role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <span className="alert-text">{this.props.message}</span>
            </div>
        );
    }
}

Alert.propTypes = {
    alertType: React.PropTypes.string,
    message: React.PropTypes.string
};

class NavBar extends React.Component {
    render() {
        return (
            <div id="navigation">
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Testing Parse</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <Link onClick={this.props.logout}>
                                        Log out <span className="glyphicon glyphicon-log-out"></span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

NavBar.propTypes = {
    logout: React.PropTypes.func
};

class PageComponent extends React.Component {
    componentWillMount() {
        document.body.className = this.props.bodyClass;
        document.title = this.props.title;
    }

    spawnAlert(alertType, message) {
        this.props.alerts.push(
            <Alert alertType={alertType} message={message} key={alertId} />
        );

        alertId += 1;
        this.setState({
            numAlerts: this.state.numAlerts + 1
        });

        window.setTimeout(() => {
            const alert = $('#alerts').find('.alert:not(".fading")').first();
            alert.addClass('fading');
            alert.fadeTo(1500, 0);

            const self = this;
            alert.slideUp(500, () => {
                self.props.alerts.shift();
                this.setState({
                    numAlerts: this.state.numAlerts - 1
                });
            });
        }, 5000);
    }

    spawnError(error, undefinedMessage = 'Undefined Error') {
        if (error === undefined) {
            this.spawnAlert('danger', undefinedMessage);
            return;
        }

        this.spawnAlert('danger', 'Error: ' + error.code + ' ' + error.message);
    }
}

PageComponent.defaultProps = {
    alerts: [],
    bodyClass: '',
    name: '',
    title: ''
};

PageComponent.propTypes = {
    bodyClass: React.PropTypes.string,
    title: React.PropTypes.string
};

class AppPage extends PageComponent {
    logout() {
        auth.logout();
        history.pushState(null, '/#/login');
    }

    render() {
        const content = this.renderContent();
        return (
            <div id={this.props.name + '-page'}>
                <NavBar logout={this.logout.bind(this)} />

                <div id="main" className="container first">
                    <div id="content">{content}</div>
                    <div id="alerts" className="container ontop">
                        {this.props.alerts}
                    </div>
                </div>
            </div>
        );
    }
}

AppPage.propTypes = extend(AppPage.propTypes, {
    alerts: React.PropTypes.list,
    name: React.PropTypes.string
});

class AuthPage extends PageComponent {
    render() {
        const content = this.renderContent();
        return (
            <div id={this.props.name + '-page'}>
                <div id= "main" className="container first">
                    <div id="content">{content}</div>
                    <div id="alerts" className="container ontop">
                        {this.props.alerts}
                    </div>
                </div>
            </div>
        );
    }
}

AuthPage.propTypes = extend(AuthPage.propTypes, {
    alerts: React.PropTypes.list,
    name: React.PropTypes.string
});

export {AppPage, AuthPage};
