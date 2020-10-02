import React from 'react';
import classes from './Navigation.module.css';
import NavigationItems from './NavigationItems/NavigationItems';

const navigation = props => {
    return (
        <div className={classes.Navigation}>
            <NavigationItems/>
        </div>
    );
}
export default navigation;