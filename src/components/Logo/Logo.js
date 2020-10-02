import React from 'react';
import classes from './Logo.module.css';
import logo from '../../assets/images/recolored-game.png';

const Logo = props => {
    return (
        <div className={classes.Logo}>
            <img alt='img' src={logo}/>
        </div>
    );
}
export default Logo;