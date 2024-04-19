## Contributing 👨‍💻 

###  How to contribute
- Take a look at the existing [Issues](https://github.com/Innovateninjas/Paws-frontend) or [create a new issue](https://github.com/Innovateninjas/Paws-frontend/issues/new/choose)!
- Fork the Repo. Then, create a branch for any issue that you are working on. Finally, commit your work.
- Create a **[Pull Request](https://github.com/Innovateninjas/Paws-frontend)** (_PR_), which will be promptly reviewed and given suggestions for improvements by the community.
- Add screenshots or screen captures to your Pull Request to help us understand the effects of the changes proposed in your PR.

### Setup && Instllation

**FIrebase**

- Go to [Firebase Console](https://console.firebase.google.com/u/0/) and create a new project with any name(Do not enable the google anlytics for the project if asked )  
- Go to project overview  under  *General* tab scroll down add app (dont try below its deleted already)
![Fire Base Config Screenshot](https://res.cloudinary.com/dff97ky68/image/upload/v1713553341/sbh/h0lzqfqnonb2ohrs9p1o.jpg)
- create a **.env** file in the root of the folder 
copy the **.env.sample** content and replace the fireBase config values also replace the firebaseConfig in the [firebase-messaging-sw.js] with your credentials 
- Again go to project overview  under Cloud Messaging Generate key pair  copy the key and replace  it with **VAPID_KEY** in **.env** 

- for more details check out [FCM DOCS](https://firebase.google.com/docs/cloud-messaging/js/client) 