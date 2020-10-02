import React from 'react';
import classes from './GameItem.module.css';
import {FaShoppingCart} from "react-icons/fa/index";


const gameItem = props => {
    return (
        <div className={classes.GameItemOuter}>
            <div onClick={() => props.loadDetails(props.id)} className={classes.GameItemClickable}>
                <div className={classes.PicturePart}>
                    {props.image?<img alt='img' height='250px' width='206px' src={props.image}/>:null}
                </div>
                <div className={classes.TextPart}>{props.name}</div>
            </div>
            <button className={classes.Button} onClick={() => props.addToCart(props.id)}>Add to cart <FaShoppingCart/> </button>
        </div>
    );
}
export default gameItem;