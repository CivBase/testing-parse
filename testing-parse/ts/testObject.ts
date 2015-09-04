declare var Parse;

var TestObject = (function (Parse: any): any {
    'use strict';

    return Parse.Object.extend('TestObject');
}(Parse));
