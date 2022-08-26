import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import shoppingCartReducer from './store/reducers/ShoppingCart'
import authReducer from './store/reducers/Auth'
import { Provider } from 'react-redux'
import { getDocs, collection } from 'firebase/firestore'
import { db } from './firebase/firebase'

const test = async () => {
  const querySnapshot = await getDocs(collection(db, 'test'))
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`)
  })
}

test()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  auth: authReducer,
  shoppingCart: shoppingCartReducer,
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
