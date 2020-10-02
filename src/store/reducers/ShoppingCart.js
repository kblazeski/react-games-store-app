import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cart: [],
    length: 0
};

const reducer = (state=initialState,action) => {
    switch (action.type){
        case actionTypes.ADD_GAME:
            if(state.cart.filter(item => item.id === action.game.id).length > 0){
                return state;
            }
            return {
                ...state,
                cart: state.cart.concat(action.game),
                length: state.cart.length+1
            }
        case actionTypes.REMOVE_GAME:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.id),
                length: state.cart.length-1
            }
        case actionTypes.RESET_CART:
            return {
                ...state,
                cart: [],
                length: 0
            }
        default: return state;
    }
}
export default reducer;