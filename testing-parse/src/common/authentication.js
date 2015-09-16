import {Parse} from 'parse';

class Authentication {
    getUser() {
        return Parse.User.current();
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            Parse.User.logIn(email, password, {
                error: (user, error) => {
                    reject(user, error);
                },
                success: (user) => {
                    resolve(user);
                }
            });
        });
    }

    logout() {
        Parse.User.logOut();
    }

    register(email, password) {
        let user = new Parse.User();
        user.set('email', email);
        user.set('username', email);
        user.set('password', password);

        return new Promise((resolve, reject) => {
            user.signUp(null, {
                error: (newUser, error) => {
                    reject(newUser, error);
                },
                success: (newUser) => {
                    resolve(newUser);
                }
            });
        });
    }
}

export default Authentication;
