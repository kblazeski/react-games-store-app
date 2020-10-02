import * as actionTypes from './actionTypes';

export const addGameInCart = (game) => {
    return {
        type: actionTypes.ADD_GAME,
        game: game,
    }
}
export const removeGameFromCart = (id) => {
    return {
        type: actionTypes.REMOVE_GAME,
        id: id
    }
}
export const resetCart = () => {
    return {
        type: actionTypes.RESET_CART,
    }
}