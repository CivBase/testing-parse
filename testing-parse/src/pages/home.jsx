import {Parse} from 'parse';
import ParseReact from 'parse-react';
import React from 'react';
import reactMixin from 'react-mixin';
import {Link} from 'react-router';

import {AppPage} from '../common/components';
import {TestObject} from '../common/models';

class HomePage extends AppPage {
    renderContent() {
        this.name = 'home';
        this.title = 'Home Page';
        return (
            <div>
                <h1>Butterflies</h1>
                <hr />
                <TestObjectTable page={this} />
            </div>
        );
    }
}

class TestObjectTable extends React.Component {
    render() {
        let errors = this.queryErrors();
        for (let i in errors) {
            if (!errors.hasOwnProperty(i)) {
                continue;
            }
            this.props.page.spawnError(errors[i]);
        }
        let self = this;
        let rowId = 0;
        return (
            <div>
                <div className="well">
                    <div className="container-fluid">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="input-foo">foo</label>
                            <input type="text" className="form-control" id="input-foo" placeholder="foo" />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="select-bar">bar</label>
                            <select className="form-control" id="select-bar">
                                <option>North</option>
                                <option>South</option>
                                <option>East</option>
                                <option>West</option>
                            </select>
                        </div>
                        <button className="btn btn-primary pull-right" onClick={this.createTestObject.bind()}>Create</button>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>createdAt</th>
                        <th>updatedAt</th>
                        <th>foo</th>
                        <th>bar</th>
                        <th width="0"></th>
                    </tr>
                    </thead>
                    <tbody id="test-object-data">
                        {this.data.testObjects.map((testObject) => {
                            let row = (
                                <TestObjectRow testObject={testObject} remove={self.removeTestObject.bind(testObject.id)} key={rowId} />
                            );
                            rowId += 1;
                            return row;
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    observe() {
        return {
            testObjects: new Parse.Query(TestObject)
        };
    }

    createTestObject() {
        let foo = document.getElementById('input-foo').value;
        let e = document.getElementById('select-bar');
        let bar = e.options[e.selectedIndex].text;
        let testObject = new TestObject();
        testObject.save({
            bar: bar,
            foo: foo
        }, {
            error: (newTestObject, error) => {
                this.props.page.spawnError(error);
            },
            success: (newTestObject) => {
                this.props.page.spawnAlert('info', 'Successfully created a new TestObject with ID: ' + newTestObject.id);
                this.refreshQueries(['testObjects']);
                this.render();
            }
        });
    }

    removeTestObject(id) {
        for (let i in this.data.testObjects) {
            if (!this.data.testObjects.hasOwnProperty(i) || this.data.testObjects[i].id !== id) {
                continue;
            }
            this.data.testObjects[i].destroy({
                error: (testObject, error) => {
                    this.props.page.spawnError(error);
                },
                success: (testObject) => {
                    this.data.testObjects.splice(this.data.testObjects.indexOf(testObject), 1);
                    this.render();
                }
            });
            return;
        }
        this.props.page.spawnAlert('danger', 'No TestObject found with ID: ' + id);
    }
}

class TestObjectRow extends React.Component {
    render() {
        return (
            <tr id={'test-object-' + this.props.testObject.id}>
                <td className="id">{this.props.testObject.id}</td>
                <td className="createdAt">{this.props.testObject.createdAt.toLocaleString()}</td>
                <td className="updatedAt">{this.props.testObject.updatedAt.toLocaleString()}</td>
                <td className="foo">{this.props.testObject.foo}</td>
                <td className="bar">{this.props.testObject.bar}</td>
                <td>
                    <button className="btn btn-default btn-sm" onClick={this.props.remove}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </td>
            </tr>
        );
    }
}

reactMixin(TestObjectTable.prototype, ParseReact.Mixin);

export default HomePage;
