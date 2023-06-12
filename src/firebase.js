// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqOiM2gYZTwDOc8zq1Nxx_vdI7iS6ZXj8",
  authDomain: "chat-738bf.firebaseapp.com",
  projectId: "chat-738bf",
  storageBucket: "chat-738bf.appspot.com",
  messagingSenderId: "890050736533",
  appId: "1:890050736533:web:e9b6773ed0a865be8b869c",
  measurementId: "G-FPGLNLXZ5K",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
