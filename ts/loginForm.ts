declare var ALERT;
declare var jQuery;
declare var Parse;

var LOGIN_FORM = (function ($: any, ALERT: any, Parse: any, window: any): any {
    'use strict';

    var api: any = {};

    api.login = function (): void {
        var username: string = $('#input-username').val();
        var password: string = $('#input-password').val();
        Parse.User.logIn(username, password, {
            error: function (user: any, error: any): void {
                ALERT.spawnError(error);
            },
            success: function (user: any): void {
                window.location.href = 'index.html';
            }
        });
    };

    return api;
}(jQuery, ALERT, Parse, window));
