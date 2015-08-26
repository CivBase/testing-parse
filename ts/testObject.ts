declare var Parse;

var TestObject = (function (Parse: any) {
    'use strict';

    var TestObject = Parse.Object.extend('TestObject', {
        initialize: function (foo: string, bar: string) {
            this.foo = foo;
            this.bar = bar;
        }
    });

    return TestObject;
}(Parse));
