// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBch6rQHsHdc4Or62iPhA5nDgBXUqFtQ4s",
  authDomain: "modern-javascript--tut.firebaseapp.com",
  projectId: "modern-javascript--tut",
  storageBucket: "modern-javascript--tut.firebasestorage.app",
  messagingSenderId: "832190725543",
  appId: "1:832190725543:web:6701c10a2b6fa1780d4a82",
  measurementId: "G-Q4RTX1JLHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };