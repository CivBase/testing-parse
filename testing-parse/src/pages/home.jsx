import {Parse} from 'parse';
import ParseReact from 'parse-react';
import React from 'react';

import {AppPage} from '../common/components';
import {TestObject} from '../common/models';
import {extend, getSelectedOptionById} from '../common/utils';

const ParseComponent = ParseReact.Component(React);

class HomePage extends AppPage {
    renderContent() {
        return (
            <div>
                <h1>Butterflies</h1>
                <hr />
                <TestObjectTable page={this} />
            </div>
        );
    }
}

HomePage.defaultProps = extend(HomePage.defaultProps, {
    bodyClass: 'alert-page nav-page',
    name: 'home',
    title: 'Home Page'
});

class TestObjectTable extends ParseComponent {
    componentWillUpdate() {
        const errors = this.queryErrors();
        for (const i in errors) {
            if (!errors.hasOwnProperty(i)) {
                continue;
            }
            this.props.page.spawnError(errors[i]);
        }
    }

    createTestObject() {
        const foo = document.getElementById('input-foo').value;
        const bar = getSelectedOptionById('select-bar').text;

        ParseReact.Mutation.Create('TestObject', {
            bar: bar,
            foo: foo
        }).dispatch();
    }

    observe(props, state) {
        return {
            testObjects: new Parse.Query(TestObject)
        };
    }

    removeTestObject(id) {
        for (const i in this.data.testObjects) {
            if (!this.data.testObjects.hasOwnProperty(i) || this.data.testObjects[i].id !== id) {
                continue;
            }

            ParseReact.Mutation.Destroy(this.data.testObjects[i]).dispatch();
            return;
        }

        this.props.page.spawnAlert('danger', 'No TestObject found with ID: ' + id);
    }

    render() {
        const self = this;
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
                        <button className="btn btn-primary pull-right" onClick={this.createTestObject.bind(this)}>Create</button>
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
                        const row = (
                            <TestObjectRow testObject={testObject} remove={self.removeTestObject.bind(this, testObject.id)} key={rowId} />
                        );
                        rowId += 1;
                        return row;
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

TestObjectTable.propTypes = {
    page: React.PropTypes.component
};

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

TestObjectRow.propTypes = {
    remove: React.PropTypes.func,
    testObject: React.PropTypes.object
};

export default HomePage;
