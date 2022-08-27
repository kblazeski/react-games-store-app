import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { auth, db } from '../firebase/firebase'
import { useUser } from './UserProvider'

export const LikedAlbumsContext = createContext()

export const useLikedAlbums = () => {
  const { likedAlbums } = useContext(LikedAlbumsContext)
  return likedAlbums
}

export const useAddLikedAlbum = () => {
  const user = useUser()
  const { updateAlbums } = useContext(LikedAlbumsContext)
  return async (album) => {
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      albums: arrayUnion(album),
    })
    updateAlbums(album, false)
  }
}

export const useCheckIfAlbumExists = (album) => {
  const { likedAlbums } = useContext(LikedAlbumsContext)
  return (album) => {
    return likedAlbums.findIndex((likedAlbum) => likedAlbum.albumName === album.albumName) !== -1
  }
}

export const useRemoveLikedAlbum = (album) => {
  const user = useUser()
  const { updateAlbums } = useContext(LikedAlbumsContext)
  return async (album) => {
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      albums: arrayRemove(album),
    })
    updateAlbums(album, true)
  }
}

export const LikedAlbumsProvider = ({ children }) => {
  const user = useUser()
  const [likedAlbums, setLikedAlbums] = useState([])

  const getLikedAlbums = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      const userData = await getDoc(userRef)
      setLikedAlbums(userData.data().albums)
      console.log(userData.data())
    } else {
      setLikedAlbums([])
    }
  }

  const checkIfAlbumExists = (album) => {
    return likedAlbums.findIndex((likedAlbum) => likedAlbum.albumName === album.albumName)
  }

  const updateAlbums = (album, remove) => {
    if (remove) {
      const albums = likedAlbums.filter((item) => item.albumName !== album.albumName)
      setLikedAlbums(albums)
    } else {
      if (checkIfAlbumExists(album) === -1) {
        setLikedAlbums([...likedAlbums, album])
      }
    }
  }

  useEffect(() => {
    getLikedAlbums()
  }, [user])

  return <LikedAlbumsContext.Provider value={{ likedAlbums, updateAlbums }}>{children}</LikedAlbumsContext.Provider>
}
