import * as alert from './alert';

let register = function() {
    let email = $('#input-email').val();
    let username = $('#input-username').val();
    let password = $('#input-password').val();

    let user = new Parse.User();
    user.set('email', email);
    user.set('username', username);
    user.set('password', password);

    user.signUp(null, {
        error: (newUser, error) => {
            alert.spawnError(error);
        },
        success: (newUser) => {
            window.location.href = 'index.html';
        }
    });
};

export {register};
