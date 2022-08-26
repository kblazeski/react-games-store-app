// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCKdky09sCJnnlde2kCTQ_L7RZQyQMS0VY',
  authDomain: 'games-store-project.firebaseapp.com',
  databaseURL: 'https://games-store-project.firebaseio.com',
  projectId: 'games-store-project',
  storageBucket: 'games-store-project.appspot.com',
  messagingSenderId: '404947513305',
  appId: '1:404947513305:web:7ccb4b1616511e982873c8',
  measurementId: 'G-7SS3LH1JEE',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
export const auth = getAuth(app)
