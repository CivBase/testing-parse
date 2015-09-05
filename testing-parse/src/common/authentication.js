import Parse from 'parse';

let login = function(username, password) {
    return new Promise((resolve, reject) => {
        Parse.User.logIn(username, password, {
            error: (user, error) => {
                reject(user, error);
            },
            success: (user) => {
                resolve(user);
            }
        });
    });
};

let logout = function() {
    Parse.User.logOut();
};


export {login, logout};
