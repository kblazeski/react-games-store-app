import React, { useState, useEffect } from 'react'
import Layout from './hoc/Layout'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Toolbar from './components/Toolbar/Toolbar'
import Footer from './components/Footer/Footer'
import WrapperFlex from './hoc/WrapperFlex'
import FindAlbums from './containers/FindAlbums/FindAlbums'
import { Route } from 'react-router-dom'
import Details from './containers/Details/Details'
import Backdrop from './components/UI/Backdrop/Backdrop'
import SideDrawer from './components/Toolbar/SideDrawer/SideDrawer'
import ShoppingCart from './containers/ShoppingCart/ShoppingCart'
import SignUp from './containers/SignUp/SignUp'
import Login from './containers/Login/Login'
import { connect } from 'react-redux'
import * as action from './store/actions/index'
import MyGames from './containers/MyGames/MyGames'

const App = (props) => {
  const [sideDrawerState, changeSideDrawerState] = useState(false)

  useEffect(() => {
    props.firstLogin()
  }, [])

  const toggleSideDrawer = () => {
    changeSideDrawerState(!sideDrawerState)
  }

  let showBackDrop = null
  if (sideDrawerState) {
    showBackDrop = <Backdrop closeBackdrop={toggleSideDrawer} />
  }
  return (
    <div className="App">
      <BrowserRouter>
        <SideDrawer isOpen={sideDrawerState} />
        {showBackDrop}
        <WrapperFlex>
          <Toolbar openSideDrawer={toggleSideDrawer} />
          <Layout>
            <Switch>
              <Route path="/album/details" component={Details} />
              <Route path="/find-albums" component={FindAlbums} />
              <Route path="/shopping-cart" component={ShoppingCart} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/mygames" component={MyGames} />
              <Redirect to="/" />
            </Switch>
          </Layout>
          <Footer />
        </WrapperFlex>
      </BrowserRouter>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    firstLogin: () => dispatch(action.firstLogin()),
  }
}
export default connect(null, mapDispatchToProps)(App)
