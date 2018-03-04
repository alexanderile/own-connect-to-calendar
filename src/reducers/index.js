import filters from './filters';
import users from './users';
import statuses from './statuses';
import {combineReducers} from 'redux';

export default combineReducers({
    filters,
    users,
    statuses
});