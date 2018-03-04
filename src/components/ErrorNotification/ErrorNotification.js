import React from 'react';
import './ErrorNotification.styl';

const ErrorNotification = (props) => {
    if (!props.msg) {
        return null;
    }
    return <div className={'Error'}>{props.msg}</div>;
};

export default ErrorNotification;