declare var jQuery;
declare var Parse;
declare var TestObject;

var TEST_OBJECT_TABLE = (function ($: any, Parse: any, TestObject: any, window: any): Object {
    'use strict';

    var api: any = {
        data: []
    };

    api.addTestObject = function (testObject: any): void {
        api.data.push(testObject);

        var body = $('#test-object-data');
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
        row.find('.foo').text(testObject.foo);
        row.find('.bar').text(testObject.bar);
        body.append(row);
    };

    api.create = function (): void {
        var foo: string = $('#foo-input').val();
        var bar: string = $('#bar-select').find('option:selected').text();
        var testObject = new TestObject();
        testObject.save({
            bar: bar,
            foo: foo
        }, {
            error: function (testObject: any, error: any): void {
                api.spawnAlert('danger', error.message);
            },
            success: function (testObject: any): void {
                api.addTestObject(testObject);
                api.spawnAlert('info', 'Successfully created a new TestObject with ID: ' + testObject.id);
            }
        });
    };

    api.initialize = function (): void {
        var query = new Parse.Query(TestObject);
        query.find({
            error: function (error: any): void {
                api.spawnAlert('danger', error.message);
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
                    api.spawnAlert('danger', error.message);
                },
                success: function (testObject: any): void {
                    $('#test-object-' + id).remove();
                    api.data.splice(api.data.indexOf(testObject), 1);
                }
            });
            return;
        }
        api.spawnAlert('danger', 'No TestObject found with ID: ' + id);
    };

    api.spawnAlert = function (type: string, message: string): void {
        $('#alerts').append(
            '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' + message +
            '</div>');

        window.setTimeout(function (): void {
            var alert = $('#alerts').find('.alert:not(".fading")').first();
            alert.addClass('fading');
            alert.fadeTo(1500, 0);
            alert.slideUp(500, function (): void {
                $(this).remove();
            });
        }, 5000);
    };

    $(document).ready(api.initialize);

    return api;
}(jQuery, Parse, TestObject, window));
