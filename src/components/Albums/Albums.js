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
          addToLiked={props.addToLiked}
          key={item['albumName'].value}
          id={item['albumName'].value}
          genre={item.genres?.value}
          artistName={props.artistName}
          album={item}
        />
      )
    })
  }
  return <div className={classes.Albums}>{albums}</div>
}
export default React.memo(Albums)
