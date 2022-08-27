import React from 'react'
import { useContext, useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export const UserContext = createContext()

export const useUser = () => {
  const { user } = useContext(UserContext)
  return user
}

export const useLogoutUser = () => {
  const { setUser } = useContext(UserContext)
  return () => {
    setUser(undefined)
    signOut(auth).then(() => {
      setUser(undefined)
    })
  }
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(undefined)
    }
  })

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
