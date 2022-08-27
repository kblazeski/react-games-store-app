import React, { useState } from 'react'
import classes from './ShoppingCart.module.css'
import { connect } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import * as action from '../../store/actions'
import Modal from '../../components/UI/Modal/Modal'
import Order from '../../components/Order/Order'
import axios from 'axios'
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar'
import { useLikedAlbums, useRemoveLikedAlbum } from '../../context/LikedAlbumsProvider'
import { MdAlbum } from 'react-icons/md'

const ShoppingCart = (props) => {
  const likedAlbums = useLikedAlbums()
  const removeLikedAlbum = useRemoveLikedAlbum()

  const navigateToDetails = (album) => {
    props.history.push(`/album/details?albumName=${album.albumName}&artistName=${album.artistName}`)
  }

  let items = likedAlbums.map((item) => {
    return (
      <div key={item.albumName} className={classes.CartItem} onClick={() => navigateToDetails(item)}>
        <div className={classes.PicturePart}>
          <MdAlbum color="white" size={100} style={{ width: '90%', height: '90%' }} />
        </div>
        <div>{item.albumName}</div>
        <div
          onClick={(event) => {
            event.stopPropagation()
            removeLikedAlbum(item)
          }}
          className={classes.TrashButton}
        >
          <FaTrash />
        </div>
      </div>
    )
  })

  return (
    <div className={classes.ShoppingCartContainer}>
      <div className={classes.ShoppingCart}>
        {items.length > 0 ? (
          items
        ) : (
          <p style={{ color: 'white', textAlign: 'center' }}>Currently there is no liked album</p>
        )}
      </div>
    </div>
  )
}
export default ShoppingCart
