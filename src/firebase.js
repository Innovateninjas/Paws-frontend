// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging  } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBbRhJ8JsZugYBIg3w4q1b8anombM4GAqA",
    authDomain: "gssocfront.firebaseapp.com",
    projectId: "gssocfront",
    storageBucket: "gssocfront.appspot.com",
    messagingSenderId: "247620976596",
    appId: "1:247620976596:web:7ac35a089a00e468316041"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);