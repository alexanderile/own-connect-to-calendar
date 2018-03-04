import React, { Component } from 'react';
import './App.styl';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import {setUsers} from '../actions';
import Calendar from './Calendar'
import Editor from './Editor';
import {getUsers} from '../services/model/users-list';
import {getStatus} from '../services/model/status-list';
import {setStatuses} from "../actions/index";

class App extends Component {
    componentDidMount = () => {
        Promise.all([
            getUsers(),
            getStatus()
        ])
            .then(([users, statuses]) => {
                this.props.dispatch(setUsers(users));
                this.props.dispatch(setStatuses(statuses));
            })
    };

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path={'/editor/:id?'} component={Editor}/>
                    <Route path={'/:page?'} component={Calendar} exact/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect()(App));