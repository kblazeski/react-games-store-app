import React from 'react'
import classes from './AlbumItem.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { MdAlbum } from 'react-icons/md'
import { useUser } from '../../../context/UserProvider'
import { useCheckIfAlbumExists } from '../../../context/LikedAlbumsProvider'

const AlbumItem = (props) => {
  const user = useUser()
  const checkIfAlbumExists = useCheckIfAlbumExists()
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
      {user && !checkIfAlbumExists({ albumName: props.id, artistName: props.artistName }) ? (
        <button
          className={classes.Button}
          onClick={() => props.addToLiked({ albumName: props.id, artistName: props.artistName })}
        >
          <AiFillHeart size={20} />
        </button>
      ) : (
        <div className={classes.Button}></div>
      )}
    </div>
  )
}
export default AlbumItem
