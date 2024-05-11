/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBgRI7QrEqlrtj94hZ-MKtYc77XunOc_9w",
  authDomain: "paws-b9b64.firebaseapp.com",
  projectId: "paws-b9b64",
  storageBucket: "paws-b9b64.appspot.com",
  messagingSenderId: "610215952536",
  appId: "1:610215952536:web:4f832813ef5d58acb010ed",
  measurementId: "G-3TBQ0B47KK",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./notification_icon.ico",
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
