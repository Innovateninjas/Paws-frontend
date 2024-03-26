
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyBgRI7QrEqlrtj94hZ-MKtYc77XunOc_9w",
    authDomain: "paws-b9b64.firebaseapp.com",
    projectId: "paws-b9b64",
    storageBucket: "paws-b9b64.appspot.com",
    messagingSenderId: "610215952536",
    appId: "1:610215952536:web:4f832813ef5d58acb010ed",
    measurementId: "G-3TBQ0B47KK"
};



const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notfication.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});