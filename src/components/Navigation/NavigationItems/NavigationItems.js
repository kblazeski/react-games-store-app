import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { connect } from 'react-redux'
import { useUser } from '../../../context/UserProvider'
import { AiFillHeart } from 'react-icons/ai'
import { useLikedAlbums } from '../../../context/LikedAlbumsProvider'

const NavigationItems = (props) => {
  const user = useUser()
  const likedAlbums = useLikedAlbums()

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
        {user ? (
          <NavigationItem link="/login">
            <FaUser />
            {user.displayName}
          </NavigationItem>
        ) : (
          <NavigationItem link="/login">
            <FaUser />
            Log in
          </NavigationItem>
        )}
        {user ? (
          <NavigationItem link="/shopping-cart">
            <span>
              <AiFillHeart />
              <span className={classes.Badge}>{likedAlbums.length}</span>
            </span>
            Liked Albums
          </NavigationItem>
        ) : null}
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
export default connect(mapStateToProps)(NavigationItems)
