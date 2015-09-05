import React from 'react';
import {Link} from 'react-router';

import {getData} from '../../common/request';

class HomePage extends React.Component {
    render() {
        let {title} = this.props.data.home;

        return (
            <div id="home-page">
                <div id="navigation">
                    <nav class="navbar navbar-default navbar-fixed-top">
                        <div class="container-fluid">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <a class="navbar-brand" href="#">Testing Parse</a>
                            </div>
                            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul class="nav navbar-nav navbar-right">
                                    <li><a href="">Log out <span class="glyphicon glyphicon-log-out"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

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
