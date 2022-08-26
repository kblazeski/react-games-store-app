import React from 'react'
import classes from './AlbumItem.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { MdAlbum } from 'react-icons/md'

const AlbumItem = (props) => {
  return (
    <div className={classes.AlbumItemOuter}>
      <div
        onClick={() => props.loadDetails(`albumName=${props.id}&artistName=${props.artistName}`)}
        className={classes.AlbumItemClickable}
      >
        <div className={classes.PicturePart}>
          <MdAlbum color="white" size={100} style={{ width: '90%', height: '90%' }} />
        </div>
        <div className={classes.TextPart}>{props.album.albumName.value}</div>
      </div>
      <button className={classes.Button} onClick={() => props.addToCart(props.id)}>
        <AiFillHeart size={20} />
      </button>
    </div>
  )
}
export default AlbumItem
