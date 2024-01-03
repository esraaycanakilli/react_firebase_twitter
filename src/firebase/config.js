// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyofqT0N8T823B5_4UbzjPynsi5uhkREk",
  authDomain: "twitter-6bfb0.firebaseapp.com",
  projectId: "twitter-6bfb0",
  storageBucket: "twitter-6bfb0.appspot.com",
  messagingSenderId: "548051448543",
  appId: "1:548051448543:web:ec0b6a36947a0c2ed5ef6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)
export const storage=getStorage(app)