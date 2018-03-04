import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePickerContainer from '../DatePickerContainer';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './Filters.styl';
import {setFilters} from "../../actions/index";

class FiltersBlock extends Component {
    state = {
        minDate: null,
        maxDate: null
    };

    onUserChange = (value) => {
        this.props.dispatch(setFilters({
            selectedUser: value ? value.value : '',
            startDate: this.props.filters.startDate,
            endDate: this.props.filters.endDate
        }));
    };

    onDateRangeChange = (startDate, endDate) => {
        this.setState({
            minDate: startDate,
            maxDate: endDate
        }, () => {
            this.props.dispatch(setFilters({
                selectedUser: this.props.filters.selectedUser,
                startDate,
                endDate
            }))
        });

    };

    render() {
        const users = this.props.users;

        return (
            <div className="Filters">
                <div className={'Filters__wrapper'}>
                    <label>Collaborator</label>
                    <Select
                        placeholder={'Choose user'}
                        searchable={true}
                        clearable={true}
                        onChange={this.onUserChange}
                        value={this.props.filters.selectedUser}
                        options={users}/>
                </div>
                <div className={'Filters__wrapper Filters__wrapper--date-picker'}>
                    <label>Date</label>
                    <DatePickerContainer
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onChange={this.onDateRangeChange}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({filters, users}) => ({
    filters,
    users
});

export default connect(
    mapStateToProps
)(FiltersBlock);