import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = props => {
    return (
        <div onClick={props.closeBackdrop} className={classes.Backdrop}>

        </div>
    );
}
export default backdrop;