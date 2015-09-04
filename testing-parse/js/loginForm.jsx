import * as authentication from './authentication';

let login = function() {
    let username = $('#input-username').val();
    let password = $('#input-password').val();
    authentication.login(username, password);
};

export {login};
