import firebase from 'firebase/app'
import  'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: "AIzaSyBMxTBqkEx4ptWXjFpS9Nnn7jhJO570M-w",
  authDomain: "react-firebase-images.firebaseapp.com",
  projectId: "react-firebase-images",
  storageBucket: "react-firebase-images.appspot.com",
  messagingSenderId: "463281278260",
  appId: "1:463281278260:web:c5395a9081471032856961",
  measurementId: "G-E2VNC7WJXE"
})
const firestore = app.firestore()
export const storage = firebase.storage()
export const database = {
  images: firestore.collection('images'),
  createdAt: firebase.firestore.FieldValue.serverTimestamp
}