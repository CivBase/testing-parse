import $ from 'jquery';
import React from 'react';
import reactMixin from 'react-mixin';
import {Link, Navigation} from 'react-router';

import * as auth from '../common/authentication';

let alertId = 0;

class Alert extends React.Component {
    render() {
        return (
            <div className="alert alert-{this.props.alertType} alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <span className="alert-text">{this.props.message}</span>
            </div>
        );
    }
}

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
                                    <a href="#" onClick={this.props.logout}>
                                        Log out <span className="glyphicon glyphicon-log-out"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

class PageComponent extends React.Component {
    render() {
        this.alerts = [];
        this.name = '';
        this.title = '';
        let content = this.renderContent();
        document.title = this.title;
        return content;
    }

    spawnAlert(alertType, message) {
        this.alerts.push(<Alert alertType={alertType} message={message} key={alertId} />);
        alertId += 1;

        window.setTimeout(() => {
            let alert = $('#alerts').find('.alert:not(".fading")').first();
            alert.addClass('fading');
            alert.fadeTo(1500, 0);

            let self = this;
            alert.slideUp(500, () => {
                self.alerts.shift();
            });
        }, 5000);

        React.render(
            <div>{this.alerts}</div>,
            document.getElementById('alerts')
        );
    }

    spawnError(error) {
        if (error === undefined) {
            this.spawnAlert('danger', 'Undefined Error');
            return;
        }

        this.spawnAlert('danger', 'Error: ' + error.code + ' ' + error.message);
    }
}

class AppPage extends PageComponent {
    render() {
        let content = super.render();
        document.body.className = 'alert-page nav-page';
        return (
            <div id={this.name + '-page'}>
                <NavBar logout={this.logout.bind(this)} />

                <div id="main" className="container first">
                    <div id="content">{content}</div>
                    <div id="alerts" className="container ontop">
                        <div>{this.alerts}</div>
                    </div>
                </div>
            </div>
        );
    }

    logout() {
        auth.logout();
        this.transitionTo('/login');
    }
}

class AuthPage extends PageComponent {
    render() {
        let content = super.render();
        document.body.className = 'alert-page auth-page';
        return (
            <div id={this.name + '-page'}>
                <div id= "main" className="container first">
                    <div id="content">{content}</div>
                    <div id="alerts" className="container ontop">
                        <div>{this.alerts}</div>
                    </div>
                </div>
            </div>
        );
    }
}

reactMixin(AppPage.prototype, Navigation);

export {AppPage, AuthPage};
