import * as actionTypes from './actionTypes'
import axios from 'axios'

export const startSignUp = () => {
  return {
    type: actionTypes.START_REGISTER,
  }
}

export const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN,
  }
}

export const successSignUp = (data) => {
  return {
    type: actionTypes.SUCCESS_REGISTER,
    data: data,
  }
}

export const successLogin = (data) => {
  return {
    type: actionTypes.SUCCESS_LOGIN,
    data: data,
  }
}

export const firstLogin = () => {
  const data = {
    userId: localStorage.getItem('userId'),
    idToken: localStorage.getItem('idToken'),
    expiresIn: localStorage.getItem('expiresIn'),
    email: localStorage.getItem('email'),
  }
  return {
    type: actionTypes.SUCCESS_LOGIN,
    data: data,
  }
}

export const signUp = (email, pw) => {
  return (dispatch) => {
    dispatch(startSignUp())
    const authData = {
      email: email,
      password: pw,
      returnSecureToken: true,
    }
    const webApiKey = 'AIzaSyCKdky09sCJnnlde2kCTQ_L7RZQyQMS0VY'
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + webApiKey, authData).then((res) => {
      const data = {
        userId: res.data.localId,
        idToken: res.data.idToken,
        expiresIn: res.data.expiresIn,
        email: res.data.email,
      }
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('expiresIn', data.expiresIn)
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('email', data.email)
      dispatch(successSignUp(data))
    })
  }
}

export const logout = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('expiresIn')
  return {
    type: actionTypes.LOGOUT,
  }
}

export const login = (email, pw) => {
  return (dispatch) => {
    dispatch(startLogin())
    const authData = {
      email: email,
      password: pw,
      returnSecureToken: true,
    }
    const webApiKey = 'AIzaSyCKdky09sCJnnlde2kCTQ_L7RZQyQMS0VY'
    axios
      .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + webApiKey, authData)
      .then((res) => {
        const data = {
          userId: res.data.localId,
          idToken: res.data.idToken,
          expiresIn: res.data.expiresIn,
          email: res.data.email,
        }
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('expiresIn', data.expiresIn)
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('email', data.email)
        dispatch(successLogin(data))
      })
  }
}
