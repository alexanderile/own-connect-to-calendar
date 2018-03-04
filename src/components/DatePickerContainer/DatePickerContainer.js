import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerContainer.styl';


const DatePickerContainer = (props) => {
    /** TODO to redux **/
    const handleChangeStart = (startDate) => {
        props.onChange(startDate, props.endDate);
    };
    const handleChangeEnd = (endDate) => {
        props.onChange(props.startDate, endDate);
    };

    return <div className={'Date-picker-container'}>
        <DatePicker
            selected={props.startDate}
            selectsStart
            className={'Date-picker-container__element'}
            startDate={props.startDate}
            endDate={props.endDate}
            maxDate={props.maxDate}
            isClearable={true}
            onChange={handleChangeStart}
            placeholderText={'from'}
        />
        <DatePicker
            selected={props.endDate}
            selectsEnd
            className={'Date-picker-container__element'}
            startDate={props.startDate}
            endDate={props.endDate}
            isClearable={true}
            minDate={props.minDate}
            onChange={handleChangeEnd}
            placeholderText={'to'}
        />
    </div>
};

export default DatePickerContainer;