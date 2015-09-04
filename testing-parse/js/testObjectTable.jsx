import * as alert from './alert';
import TestObject from './testObject';

let data = [];

let addTestObject = function(testObject) {
    data.push(testObject);
    let row = $(
        '<tr id="test-object-${testObject.id}">' +
        '<td class="id"></td>' +
        '<td class="createdAt"></td>' +
        '<td class="updatedAt"></td>' +
        '<td class="foo"></td>' +
        '<td class="bar"></td>' +
        '<td><button class="btn btn-default btn-sm" ' +
        'onclick="testObjectTable.remove(\'${testObject.id}\')">' +
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

let create = function() {
    let foo = $('#input-foo').val();
    let bar = $('#select-bar').find('option:selected').text();
    let testObject = new TestObject();
    testObject.save({
        bar: bar,
        foo: foo
    }, {
        error: (newTestObject, error) => {
            alert.spawnError(error);
        },
        success: (newTestObject) => {
            addTestObject(newTestObject);
            alert.spawn(
                'info', 'Successfully created a new TestObject with ID: ' +
                '${newTestObject.id}');
        }
    });
};

let initialize = function() {
    let query = new Parse.Query(TestObject);
    query.find({
        error: (error) => {
            alert.spawnError(error);
        },
        success: (results) => {
            for (let i in results) {
                if (!results.hasOwnProperty(i)) {
                    continue;
                }
                addTestObject(results[i]);
            }
        }
    });
};

let remove = function(id) {
    for (let i in data) {
        if (!data.hasOwnProperty(i) || data[i].id !== id) {
            continue;
        }
        data[i].destroy({
            error: (testObject, error) => {
                alert.spawnError(error);
            },
            success: (testObject) => {
                $('#test-object-${id}').remove();
                data.splice(data.indexOf(testObject), 1);
            }
        });
        return;
    }
    alert.spawn('danger', 'No TestObject found with ID: ${id}');
};

$(document).ready(initialize);

export {addTestObject, create, initialize, remove};
