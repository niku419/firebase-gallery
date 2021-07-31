import firebase from 'firebase/app'
import  'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: "AIzaSyAAgNfJiQfiYQC2Xa97t1rLIaVhUrCBChA",
  authDomain: "imagegallery-35cb3.firebaseapp.com",
  projectId: "imagegallery-35cb3",
  storageBucket: "imagegallery-35cb3.appspot.com",
  messagingSenderId: "264337640",
  appId: "1:264337640:web:ed54a9afbdd84b16ca715d",
  measurementId: "G-DV7SXF2KVD"
})
const firestore = app.firestore()
export const storage = firebase.storage()
export const database = {
  images: firestore.collection('images'),
  createdAt: firebase.firestore.FieldValue.serverTimestamp
}