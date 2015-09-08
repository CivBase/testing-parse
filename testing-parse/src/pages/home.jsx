import React from 'react';
import {Link} from 'react-router';

import {NavBar} from '../common/components';

class HomePage extends React.Component {
    render() {

        return (
            <div id="home-page">
                <NavBar></NavBar>

                <div id="main" className="container first">
                    <h1>Butterflies</h1>
                    <hr />

                    <div className="well">
                        <div className="container-fluid">
                            <div className="form-group">
                                <label className="sr-only" for="input-foo">foo</label>
                                <input type="text" className="form-control" id="input-foo" placeholder="foo" />
                            </div>
                            <div className="form-group">
                                <label className="sr-only" for="select-bar">bar</label>
                                <select className="form-control" id="select-bar">
                                    <option>North</option>
                                    <option>South</option>
                                    <option>East</option>
                                    <option>West</option>
                                </select>
                            </div>
                            <button className="btn btn-primary pull-right" onclick="">Create</button>
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
                        <tbody id="test-object-data"></tbody>
                    </table>

                    <div id="alerts" className="container ontop"></div>
                </div>
            </div>
        );
    }

}

export default HomePage;
