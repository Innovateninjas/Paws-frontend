// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyBgRI7QrEqlrtj94hZ-MKtYc77XunOc_9w",
//     authDomain: "paws-b9b64.firebaseapp.com",
//     projectId: "paws-b9b64",
//     storageBucket: "paws-b9b64.appspot.com",
//     messagingSenderId: "610215952536",
//     appId: "1:610215952536:web:4f832813ef5d58acb010ed",
//     measurementId: "G-3TBQ0B47KK"
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3IgAfYnYRD2f3_SiV8YTdb5xD0QEC2Ps",
  authDomain: "paws-1eb95.firebaseapp.com",
  projectId: "paws-1eb95",
  storageBucket: "paws-1eb95.appspot.com",
  messagingSenderId: "120768381104",
  appId: "1:120768381104:web:c2695466eabd7813b5fb75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
