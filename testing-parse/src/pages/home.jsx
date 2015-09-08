import React from 'react';
import {Link} from 'react-router';

import {NavBar} from '../common/components';
import {getData} from '../common/request';

class HomePage extends React.Component {
    render() {
        let {title} = this.props.data.home;

        return (
            <div id="home-page">
                <NavBar></NavBar>

                <div id="main" class="container first">
                    <h1>{title}</h1>
                    <hr />

                    <div class="well">
                        <div class="container-fluid">
                            <div class="form-group">
                                <label class="sr-only" for="input-foo">foo</label>
                                <input type="text" class="form-control" id="input-foo" placeholder="foo" />
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="select-bar">bar</label>
                                <select class="form-control" id="select-bar">
                                    <option>North</option>
                                    <option>South</option>
                                    <option>East</option>
                                    <option>West</option>
                                </select>
                            </div>
                            <button class="btn btn-primary pull-right" onclick="">Create</button>
                        </div>
                    </div>

                    <table class="table table-striped table-hover">
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

                    <div id="alerts" class="container ontop"></div>
                </div>
            </div>
        );
    }

    static fetchData(params) {
        return getData('/home');
    }
}

export default HomePage;
