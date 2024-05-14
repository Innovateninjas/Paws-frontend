/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBbRhJ8JsZugYBIg3w4q1b8anombM4GAqA",
    authDomain: "gssocfront.firebaseapp.com",
    projectId: "gssocfront",
    storageBucket: "gssocfront.appspot.com",
    messagingSenderId: "247620976596",
    appId: "1:247620976596:web:7ac35a089a00e468316041"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './notification_icon.ico'
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
