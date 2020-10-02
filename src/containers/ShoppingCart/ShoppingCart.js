import React, {useState} from 'react';
import classes from './ShoppingCart.module.css';
import {connect} from 'react-redux';
import {FaTrash} from 'react-icons/fa';
import * as action from '../../store/actions';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Order/Order';
import axios from 'axios';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';

const ShoppingCart = props => {
    const [modalState,setModalState] = useState(false);
    const [loadingState,setLoadingState] = useState(false);

    let items = props.cartItems.map(item => {
        return (
           <div key={item.id} className={classes.CartItem}>
               <img alt='' src={item.img}/>
               <div>{item.name}</div>
               <div onClick={() => props.removeItemFromCart(item.id)} className={classes.TrashButton}>
                   <FaTrash/>
               </div>
           </div>
        );
    })

    const toggleModalHandler = () => {
        setModalState(!modalState);
    }

    const orderHandler = () => {
        setLoadingState(true)
        const myGamesData = {
            data: { ...props.cartItems},
            userId: props.userId
        }
        axios.post('https://games-store-project.firebaseio.com/myGames.json',myGamesData)
            .then(res => {
                setModalState(!modalState);
                setLoadingState(false);
                props.resetCart();
            })
    }

    let button = null;
    if(props.cartLength){
        button = (
            <div className={classes.ButtonContainer}>
                <button onClick={toggleModalHandler} className={classes.Button}>BUY NOW!</button>
            </div>
        );
    }

    return (
        <div className={classes.ShoppingCartContainer}>
            {loadingState?<ProgressBar/>:null}
            <Modal open={modalState}><Order order={orderHandler} toggleModal={toggleModalHandler} items={props.cartItems}/></Modal>
            <div className={classes.ShoppingCart}>
                {items}
                {button}
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        cartItems: state.shoppingCart.cart,
        cartLength: state.shoppingCart.length,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeItemFromCart: (id) => dispatch(action.removeGameFromCart(id)),
        resetCart: () => dispatch(action.resetCart())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCart);