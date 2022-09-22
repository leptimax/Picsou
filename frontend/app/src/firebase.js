// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZSRbn6ssIaB-kMcG3vNFcofURmZb7UV4",
  authDomain: "picsou-5a88b.firebaseapp.com",
  projectId: "picsou-5a88b",
  storageBucket: "picsou-5a88b.appspot.com",
  messagingSenderId: "695236356518",
  appId: "1:695236356518:web:3c21b792f6266b823f4767"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const firestore = getFirestore(app)
export const auth = getAuth(app)