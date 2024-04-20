## Contributing 👨‍💻 

###  How to contribute
- Take a look at the existing [Issues](https://github.com/Innovateninjas/Paws-frontend) or [create a new issue](https://github.com/Innovateninjas/Paws-frontend/issues/new/choose)!
- Fork the Repo. Then, create a branch for any issue that you are working on. Finally, commit your work.
- Create a **[Pull Request](https://github.com/Innovateninjas/Paws-frontend)** (_PR_), which will be promptly reviewed and given suggestions for improvements by the community.
- Add screenshots or screen captures to your Pull Request to help us understand the effects of the changes proposed in your PR.

### Setup && Installation

1. Fork the repository and clone it.
2. Install the project using `npm i`.
3. Run the project using `npm start`.
4. Create a new branch using `git checkout -b <branch_name>`

**Firebase(mandatory)**

- Go to [Firebase Console](https://console.firebase.google.com/u/0/) and create a new project with any name(Do not enable the google anlytics for the project if asked )  
- Go to project overview  under  *General* tab scroll down add app select web and then copy the firebaseconfig(dont try below its deleted already)

![Fire Base Config Screenshot](https://res.cloudinary.com/dff97ky68/image/upload/v1713553341/sbh/h0lzqfqnonb2ohrs9p1o.jpg)
- create a **.env** file in the root of the folder ,go to project overview in firebase  under Cloud Messaging Generate key pair  copy the key and replace  it with **VAPID_KEY** in **.env** 


- also replace the firebaseConfig in the [firebase-messaging-sw.js](./public/firebase-messaging-sw.js) & [firebase.js](./src/firebase.js) with your credentials 

- Again go to project overview  under Cloud Messaging Generate key pair  copy the key and replace  it with **VAPID_KEY** in **.env** 

- for more details check out [FCM DOCS](https://firebase.google.com/docs/cloud-messaging/js/client)

**Cloudinary(mandatory)**
- Create a [Cloudinary account](https://cloudinary.com/), then create a product environment.
- In access keys generate a new access key
![image](https://github.com/Innovateninjas/Paws-frontend/assets/124495375/5b6a4241-8372-4e1f-b5b3-064e57dd05e2)
- In Upload create a new upload preset
  ![image](https://github.com/Innovateninjas/Paws-frontend/assets/124495375/0e6d2111-7fbd-41b7-a3b8-a545064dd2a1)
- Paste the key and upload preset name in the `.env` file view `.env.sample` 

**Cognitive Services(AI)**(optional)
- in our app we have two ai models one which detects the animal type and number of animals in the image another one detects the type of injury of the animal ( external injuries) 
- we are not making the endpoints public due to some safety reasons , but our apps works smoothly without those end points locally so you will not face any issues 

**Naming Conventions**
- Pages under pages folder and components under components folder must be named in PascalCase
- utility function, hooks , context should be names in camelCases 


**System Design**
- to understand how its working please take a look at [Paws System Design](https://excalidraw.com/#json=GMHuRPYEPAvFAn5xM4ok8,8w53-nnoWQeDL0hPE86s9A)
For setting up backend please refer to [Paws Backend](https://github.com/Innovateninjas/Paws-Backend)

