import * as alert from './alert';

let onAuthPage = function() {
    return [
        'login.html',
        'register.html'
    ].indexOf(window.location.href) !== -1;
};

let authenticate = function() {
    if (!Parse.User.current() && !onAuthPage()) {
        window.location.href = 'login.html';
    }
};

let login = function(username, password) {
    return new Promise((resolve, reject) => {
        Parse.User.logIn(username, password, {
            error: (user, error) => {
                alert.spawnError(error);
                reject(user, error);
            },
            success: (user) => {
                window.location.href = 'index.html';
                resolve(user);
            }
        });
    });
};

let logout = function() {
    Parse.User.logOut();
    window.location.href = 'login.html';
};


export {authenticate, login, logout};
