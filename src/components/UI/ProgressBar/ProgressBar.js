import React from 'react';
import classes from './ProgressBar.module.css';
import {LinearProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    colorPrimary:{
        backgroundColor: '#c21e1b'
    },
    barColorPrimary:{
        backgroundColor: 'white'
    }
});

const ProgressBar = props => {
    const styles = useStyles();
    return (
       <div className={classes.ProgressBar}>
           <LinearProgress classes={{colorPrimary: styles.colorPrimary, barColorPrimary: styles.barColorPrimary}}/>
       </div>
    );
}
export default ProgressBar;