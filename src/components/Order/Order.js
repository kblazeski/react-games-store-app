import React from 'react';
import classes from './Order.module.css';

const order = props => {
    let items = null;
    if(props.items){
        items = props.items.map(item => {
            return <li key={item.id}><strong>{item.name}</strong></li>
        })
    }
    return (
        <div>
            <p>Are you sure you want to buy the following games?</p>
            <ul>
                {items}
            </ul>
            <div className={classes.Buttons}>
                <button onClick={props.order} className={classes.ButtonSuccess}>ORDER NOW!</button>
                <button onClick={props.toggleModal} className={classes.ButtonFail}>CANCEL</button>
            </div>
        </div>
    );
}
export default order;