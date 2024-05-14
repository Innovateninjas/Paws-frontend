## Contributing 👨‍💻 

###  How to contribute
- Take a look at the existing [Issues](https://github.com/Innovateninjas/Paws-frontend) or [create a new issue](https://github.com/Innovateninjas/Paws-frontend/issues/new/choose)!
- Fork the Repo. Then, create a branch for any issue that you are working on. Finally, commit your work.
- Create a **[Pull Request](https://github.com/Innovateninjas/Paws-frontend)** (_PR_), which will be promptly reviewed and given suggestions for improvements by the community.(request for review to [@codewarnab](https://github.com/codewarnab)
- Add screenshots or screen captures to your Pull Request to help us understand the effects of the changes proposed in your PR.

### Setup && Installation

1. Fork the repository and clone it.
2. Install the project using `npm i`.
3. Run the project using `npm start`.
4. Create a new branch using `git checkout -b <branch_name>`

### Alternatively contribute using GitHub Desktop

1. **Open GitHub Desktop:**
   Launch GitHub Desktop and log in to your GitHub account if you haven't already.

2. **Clone the Repository:**
   - If you haven't cloned the Paws-frontend repository yet, you can do so by clicking on the "File" menu and selecting "Clone Repository."
   - Choose the Paws-frontend repository from the list of repositories on GitHub and clone it to your local machine.

3. **Switch to the Correct Branch:**
   - Ensure you are on the branch that you want to submit a pull request for.
   - If you need to switch branches, you can do so by clicking on the "Current Branch" dropdown menu and selecting the desired branch.

4. **Make Changes:**
   Make your changes to the code or files in the repository using your preferred code editor.

5. **Commit Changes:**
   - In GitHub Desktop, you'll see a list of the files you've changed. Check the box next to each file you want to include in the commit.
   - Enter a summary and description for your changes in the "Summary" and "Description" fields, respectively. Click the "Commit to <branch-name>" button to commit your changes to the local branch.

6. **Push Changes to GitHub:**
   After committing your changes, click the "Push origin" button in the top right corner of GitHub Desktop to push your changes to your forked repository on GitHub.

7. **Create a Pull Request:**
  - Go to the GitHub website and navigate to your fork of the Paws-frontend repository.
  - You should see a button to "Compare & pull request" between your fork and the original repository. Click on it.

8. **Review and Submit:**
   - On the pull request page, review your changes and add any additional information, such as a title and description, that you want to include with your pull request.
   - Once you're satisfied, click the "Create pull request" button to submit your pull request.

9. **Wait for Review:**
    Your pull request will now be available for review by the project maintainers. They may provide feedback or ask for changes before merging your pull request into the main branch of the repository.

⭐️ Support the Project
If you find this project helpful, please consider giving it a star on GitHub! Your support helps to grow the project and reach more contributors.

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
For setting up backend please refer to [Paws Backend](https://github.com/Innovateninjas/Paws-Backend) for any kind of help regarding backend please create a [discussion](https://github.com/Innovateninjas/Paws-Backend/discussions)  their mention our backend dev [@anirbanmajumder0](https://github.com/anirbanmajumder0)

