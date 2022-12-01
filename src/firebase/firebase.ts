import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCYw4bqP0zBN4Cnh01pJOcgoZxV2hhYLwk",
  authDomain: "oneanna-b6bc3.firebaseapp.com",
  projectId: "oneanna-b6bc3",
  storageBucket: "oneanna-b6bc3.appspot.com",
  messagingSenderId: "200985092103",
  appId: "1:200985092103:web:9051df1beff9ba9df64aa2",
  measurementId: "G-VR0MKB9G2Q"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)

export const auth=getAuth(app)
export const storage = getStorage(app)