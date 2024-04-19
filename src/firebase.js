// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging  } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBgRI7QrEqlrtj94hZ-MKtYc77XunOc_9w",
    authDomain: "paws-b9b64.firebaseapp.com",
    projectId: "paws-b9b64",
    storageBucket: "paws-b9b64.appspot.com",
    messagingSenderId: "610215952536",
    appId: "1:610215952536:web:4f832813ef5d58acb010ed",
    measurementId: "G-3TBQ0B47KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);