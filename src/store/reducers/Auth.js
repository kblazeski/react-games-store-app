import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: null,
    idToken: null,
    loading: false,
    expiresIn: 0,
    email: null,
}

const reducer = (state=initialState,action) => {
    switch (action.type){
        case actionTypes.START_REGISTER:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.SUCCESS_REGISTER:
            return {
                ...state,
                userId: action.data.userId,
                idToken: action.data.idToken,
                expiresIn: action.data.expiresIn,
                email: action.data.email,
                loading: false,
            }
        case actionTypes.START_LOGIN:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.SUCCESS_LOGIN:
            return {
                ...state,
                userId: action.data.userId,
                idToken: action.data.idToken,
                expiresIn: action.data.expiresIn,
                email: action.data.email,
                loading: false,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                userId: null,
                idToken: null,
                expiresIn: 0,
                email: null,
            }
        default: return state;
    }
}
export default reducer;