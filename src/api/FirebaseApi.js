import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'

export const FirebaseApi = {
  getUsers: async (userName) => {
    const q = await query(
      collection(db, 'users'),
      where('userName', '>=', userName),
      where('userName', '<', `${userName}z`)
    )
    const querySnapshot = await getDocs(q)

    const users = []
    await querySnapshot.forEach((doc) => {
      users.push(doc.data())
    })

    const filteredUsers = users.filter((item) => item.id !== auth.currentUser.uid)

    return filteredUsers
  },
  getUser: async (userId) => {
    const userRef = doc(db, 'users', userId)
    const userData = await getDoc(userRef)
    return userData.data()
  },
}
