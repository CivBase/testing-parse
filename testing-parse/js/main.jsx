require.config({
    paths: {
        bootstrap: '../vend/bootstrap-3.3.5.min',
        jquery: '../vend/jquery-2.1.4.min',
        parse: '../vend/parse-1.5.0.min'
    }
});

require([
    // vend
    'jquery',
    'bootstrap',
    'parse',
    // scripts
    'alert',
    'authentication',
    'loginForm',
    'registerForm',
    'testObject',
    'testObjectTable'
], ($, bs, Parse, alert, authentication) => {
    Parse.initialize(
        'tdJFpgEza9WzemOR6nu37ATOl3iBIct2APklvOo7',
        'BRdphJDIoKHK0VAAWx9HjRckBKbGEwuW7PrQLEWO'
    );

    authentication.authenticate();
});
