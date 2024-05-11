// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOe1c3ckEVGUn4-rNbsifHrwvluOND5AE",
  authDomain: "paws-contribution.firebaseapp.com",
  projectId: "paws-contribution",
  storageBucket: "paws-contribution.appspot.com",
  messagingSenderId: "7673428873",
  appId: "1:7673428873:web:5ec4897599ef6d87c0ff58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const messaging = getMessaging(app);
