import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button from '../Button';

export default class SwitcherButton extends Component {
    render() {
        return <div className="SwitcherButton">
            <Link to={'/editor'}><Button>Add entity</Button></Link>
        </div>;
    }
}