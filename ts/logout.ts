declare var Parse;

(function (Parse: any, window: any): void {
    'use strict';

    Parse.User.logOut();
    window.location.href = 'login.html';
}(Parse, window));
