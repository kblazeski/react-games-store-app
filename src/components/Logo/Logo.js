import React from 'react'
import classes from './Logo.module.css'
import logo from '../../assets/images/recolored-game.png'
import { FaMusic } from 'react-icons/fa'

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <FaMusic size={35} />
    </div>
  )
}
export default Logo
