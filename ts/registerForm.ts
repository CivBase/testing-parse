declare var ALERT;
declare var jQuery;
declare var Parse;

var REGISTER_FORM = (function ($: any, ALERT: any, Parse: any, window: any): any {
    'use strict';

    var api: any = {};

    api.register = function (): void {
        var email: string = $('#input-email').val();
        var username: string = $('#input-username').val();
        var password: string = $('#input-password').val();

        var user = new Parse.User();
        user.set('email', email);
        user.set('username', username);
        user.set('password', password);

        user.signUp(null, {
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
