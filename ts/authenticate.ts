declare var Parse;

(function (Parse: any, window: any): void {
    'use strict';

    if (!Parse.User.current()) {
        window.location.href = 'login.html';
    }
}(Parse, window));
