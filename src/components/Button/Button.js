import React from 'react';
import './Button.styl';

const Button = (props) => {
    return <button className={'Button'} {...props}>{props.children}</button>;
};

export default Button;