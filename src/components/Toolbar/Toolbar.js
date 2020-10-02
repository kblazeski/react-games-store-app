import React from 'react';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import classes from './Toolbar.module.css';
import {FaBars} from "react-icons/fa/index";

const Toolbar = props => {
    return (
        <div className={classes.Toolbar}>
            <Logo/>
            <nav className={classes.DesktopOnly}>
                <Navigation/>
            </nav>
            <div onClick={props.openSideDrawer} className={classes.MobileBar}>
                <FaBars size={50}/>
            </div>
        </div>
    );
}
export default Toolbar;