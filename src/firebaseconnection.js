// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgDbk0cWF7rmvJRIlYgd3rktJq07n3sco",
  authDomain: "cinema-71bfe.firebaseapp.com",
  projectId: "cinema-71bfe",
  storageBucket: "cinema-71bfe.appspot.com",
  messagingSenderId: "844480615726",
  appId: "1:844480615726:web:38af1ce859323a581916bf"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth};
