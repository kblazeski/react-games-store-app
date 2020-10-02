import React from 'react';
import classes from './WrapperFlex.module.css';

const wrapperFlex = props => {
    return (
       <div className={classes.WrapperFlex}>
           {props.children}
       </div>
    );
}
export default wrapperFlex;