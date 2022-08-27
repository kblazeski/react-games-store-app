import React, { useState } from 'react'
import classes from './UserDetails.module.css'
import { MdAlbum } from 'react-icons/md'
import { useEffect } from 'react'
import { FirebaseApi } from '../../api/FirebaseApi'

const UserDetails = (props) => {
  const [userData, setUserData] = useState({ albums: [] })

  useEffect(() => {
    const queryParams = new URLSearchParams(props.location.search)
    const userId = queryParams.get('id')
    FirebaseApi.getUser(userId).then((data) => {
      setUserData(data)
    })
  }, [])

  const navigateToDetails = (album) => {
    props.history.push(`/album/details?albumName=${album.albumName}&artistName=${album.artistName}`)
  }

  const renderContent = () => {
    if (!userData) {
      return <p style={{ color: 'white', textAlign: 'center' }}>User not loaded.</p>
    } else if (userData.albums.length === 0) {
      return <p style={{ color: 'white', textAlign: 'center' }}>User currently doesn't like any album.</p>
    } else {
      return (
        <>
          <div className={classes.Inner}>
            Liked albums for user: <strong>{userData.userName}</strong>
          </div>
          {userData.albums.map((item) => {
            return (
              <div key={item.albumName} className={classes.CartItem} onClick={() => navigateToDetails(item)}>
                <div className={classes.PicturePart}>
                  <MdAlbum color="white" size={100} style={{ width: '90%', height: '90%' }} />
                </div>
                <div>{item.albumName}</div>
                <div></div>
              </div>
            )
          })}
        </>
      )
    }
  }

  return (
    <div className={classes.UserDetailsContainer}>
      <div className={classes.UserDetails}>{renderContent()}</div>
    </div>
  )
}
export default UserDetails
