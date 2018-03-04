import React, {Component} from 'react';
import Filters from '../Filters';
import SwitcherButton from '../SwitcherButton';
import List from '../List';
import './Calendar.styl';

export default class Calendar extends Component {
    render() {
        return <div className={'Calendar'}>
            <div className={'Calendar__heading'}>
                <h1>Calendar</h1>
            </div>
            <Filters/>
            <SwitcherButton/>
            <List {...this.props}/>
        </div>;
    }
}
