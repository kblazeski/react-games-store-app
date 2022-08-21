import React from 'react'
import classes from './Albums.module.css'
import AlbumItem from './AlbumItem/AlbumItem'

const Albums = (props) => {
  let albums = <div style={{ color: 'white' }}>No results found!</div>
  if (props.albums.length) {
    albums = props.albums.map((item) => {
      return (
        <AlbumItem
          loadDetails={props.loadDetails}
          addToCart={props.addToCart}
          key={item['albumName'].value}
          id={item['albumName'].value}
          album={item}
        />
      )
    })
  }
  return <div className={classes.Albums}>{albums}</div>
}
export default React.memo(Albums)
