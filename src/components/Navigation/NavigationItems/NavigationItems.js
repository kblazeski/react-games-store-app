import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { connect } from 'react-redux'

const navigationItems = (props) => {
  return (
    <React.Fragment>
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>
          Home
        </NavigationItem>
        <NavigationItem link="/find-albums">Find Albums</NavigationItem>
        <NavigationItem link="/users">Users</NavigationItem>
        <NavigationItem link="/faq">FAQ</NavigationItem>
        {props.email ? <NavigationItem link="/mygames">My Games</NavigationItem> : null}
      </ul>
      <ul className={classes.NavigationItemsAuth}>
        {props.email ? (
          <NavigationItem link="/login">{props.email}</NavigationItem>
        ) : (
          <NavigationItem link="/login">
            <FaUser />
            Log in
          </NavigationItem>
        )}
        <NavigationItem link="/shopping-cart">
          <span>
            <FaShoppingCart />
            <span className={classes.Badge}>{props.cartItemsNumber}</span>
          </span>
          Shopping Cart
        </NavigationItem>
      </ul>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    cartItemsNumber: state.shoppingCart.length,
    email: state.auth.email,
  }
}
export default connect(mapStateToProps)(navigationItems)
