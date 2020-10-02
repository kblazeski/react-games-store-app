import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
    const styles = [classes.Modal,props.open?classes.Open:classes.Closed]
    return (
        <React.Fragment>
            {props.open?<Backdrop closeBackdrop={props.cancelModal}/>:null}
            <div className={styles.join(' ')}>
                {props.children}
            </div>
        </React.Fragment>
    );
}
export default modal;