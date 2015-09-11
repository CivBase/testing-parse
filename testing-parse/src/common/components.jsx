import $ from 'jquery';
import React from 'react';
import reactMixin from 'react-mixin';
import {Link, Navigation} from 'react-router';

import * as auth from '../common/authentication';

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
        document.body.className = this.props.bodyClass;
        document.title = this.props.title;
        return this.renderContent();
    }

    spawnAlert(alertType, message) {
        this.props.alerts.push(<Alert alertType={alertType} message={message} key={alertId} />);
        alertId += 1;

        window.setTimeout(() => {
            let alert = $('#alerts').find('.alert:not(".fading")').first();
            alert.addClass('fading');
            alert.fadeTo(1500, 0);

            let self = this;
            alert.slideUp(500, () => {
                self.props.alerts.shift();
            });
        }, 5000);
    }

    spawnError(error, undefinedMessage) {
        if (error === undefined) {
            undefinedMessage = undefinedMessage || 'Undefined Error';
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

class AppPage extends PageComponent {
    render() {
        let content = super.render();
        return (
            <div id={this.props.name + '-page'}>
                <NavBar logout={this.logout.bind(this)} />

                <div id="main" className="container first">
                    <div id="content">{content}</div>
                    <div id="alerts" className="container ontop">
                        <div>{this.props.alerts}</div>
                    </div>
                </div>
            </div>
        );
    }

    logout() {
        auth.logout();
        this.transitionTo('login');
    }
}

class AuthPage extends PageComponent {
    render() {
        let content = super.render();
        return (
            <div id={this.props.name + '-page'}>
                <div id= "main" className="container first">
                    <div id="content">{content}</div>
                    <div id="alerts" className="container ontop">
                        <div>{this.props.alerts}</div>
                    </div>
                </div>
            </div>
        );
    }
}

reactMixin(AppPage.prototype, Navigation);

export {AppPage, AuthPage};
