declare var ALERT;
declare var jQuery;
declare var Parse;
declare var TestObject;

var TEST_OBJECT_TABLE = (function ($: any, ALERT: any, Parse: any, TestObject: any): any {
    'use strict';

    var api: any = {
        data: []
    };

    api.addTestObject = function (testObject: any): void {
        api.data.push(testObject);
        var row = $(
            '<tr id="test-object-' + testObject.id + '">' +
            '<td class="id"></td>' +
            '<td class="createdAt"></td>' +
            '<td class="updatedAt"></td>' +
            '<td class="foo"></td>' +
            '<td class="bar"></td>' +
            '<td><button class="btn btn-default btn-sm" ' +
            'onclick="TEST_OBJECT_TABLE.remove(\'' + testObject.id + '\')">' +
            '<span class="glyphicon glyphicon-trash"></span>' +
            '</button></td>' +
            '</tr>');

        row.find('.id').text(testObject.id);
        row.find('.createdAt').text(testObject.createdAt.toLocaleString());
        row.find('.updatedAt').text(testObject.updatedAt.toLocaleString());
        row.find('.foo').text(testObject.get('foo'));
        row.find('.bar').text(testObject.get('bar'));
        $('#test-object-data').append(row);
    };

    api.create = function (): void {
        var foo: string = $('#input-foo').val();
        var bar: string = $('#select-bar').find('option:selected').text();
        var testObject = new TestObject();
        testObject.save({
            bar: bar,
            foo: foo
        }, {
            error: function (testObject: any, error: any): void {
                ALERT.spawnError(error);
            },
            success: function (testObject: any): void {
                api.addTestObject(testObject);
                ALERT.spawn('info', 'Successfully created a new TestObject with ID: ' + testObject.id);
            }
        });
    };

    api.initialize = function (): void {
        var query = new Parse.Query(TestObject);
        query.find({
            error: function (error: any): void {
                ALERT.spawnError(error);
            },
            success: function (results: any[]): void {
                for (var i in results) {
                    if (!results.hasOwnProperty(i)) {
                        continue;
                    }
                    api.addTestObject(results[i]);
                }
            }
        });
    };

    api.remove = function (id: string): void {
        for (var i in api.data) {
            if (!api.data.hasOwnProperty(i) || api.data[i].id !== id) {
                continue;
            }
            api.data[i].destroy({
                error: function (testObject: any, error: any): void {
                    ALERT.spawnError(error);
                },
                success: function (testObject: any): void {
                    $('#test-object-' + id).remove();
                    api.data.splice(api.data.indexOf(testObject), 1);
                }
            });
            return;
        }
        ALERT.spawn('danger', 'No TestObject found with ID: ' + id);
    };

    $(document).ready(api.initialize);

    return api;
}(jQuery, ALERT, Parse, TestObject));
