import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcmJrWvsfzXuA0uxli-_U65Ulqid4jbbc",
  authDomain: "form-challenge-608e8.firebaseapp.com",
  projectId: "form-challenge-608e8",
  storageBucket: "form-challenge-608e8.appspot.com",
  messagingSenderId: "996643498302",
  appId: "1:996643498302:web:5f98b5e29970076747646f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
