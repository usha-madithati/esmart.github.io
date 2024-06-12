# Smart Saver

![Stars](https://img.shields.io/github/stars/usha-madithati/esmart.github.io?style=social) ![Forks](https://img.shields.io/github/forks/usha-madithati/esmart.github.io?style=social) ![Issues](https://img.shields.io/github/issues/usha-madithati/esmart.github.io) ![Pull Requests](https://img.shields.io/github/issues-pr/usha-madithati/esmart.github.io) ![Maintenance](https://img.shields.io/maintenance/yes/2024)

## About 

It's for a website called Smart Saver, which allows household and many super market people to have control over their food items. 
The website allows users to scan the product QR code via our website scanner.
After scanning , the users will have to give access to their mobile devices in order to get notified about their product's expiry date.
The users even have chance to set alaram in prior of 2 days or 5 days or 15 days.
So this is the overview of our website where people can save the income they are spending on dalily product purchase.

Try our web application: 
https://esmart-github-io.vercel.app/ 

And don't forget to give star ⭐ to this amazing project repository. 


### STEPS TO PROCEED:

## Logging the User:
 - Navigate to the login page
 - Enter your credentials (`email` , `password`)
 - You will get the required response from `server` in toast or text form
 - Ensure to run the server
 - If not logged in navigate through the signup page (`/signup`)

## Registering the User(Locally):
 - First, ensure you have set the backend correctly and the server is running.
 - Then fill all the required fields(`name , email , phone number , password `)
 - You will get the required response from the `server` in toast or textual error form.
 - After successfully registering the user you will navigate automatically to `/login` page.
 - Login to the application as per the steps told above.

## Authorization Tokens
- Be ensure that in the application currently    we are using the JWT and BcryptJS for authorisation in the application.
- For getting the Authorization token you must be logged in before. 
- Now after getting in the application your token will be valid for next 1 hour.
- Untill the token is valid you can use our application services as well.

## Review Section: 
Share your feedback and insights with the Smart Savers community. Your reviews help us improve and guide others in making informed choices.
## QR Code Scanning: 
Effortlessly scan QR codes to access instant product information, including ingredients, pricing, and environmental impact.
## Others: 
Explore additional pages including product management sections, and learn more and the benefits of the same.
##Here is the figma design of our project.

 https://www.figma.com/design/naU9W2cQQa04wB6WsEjkr2/Untitled?node-id=0%3A1&t=DazRyOMA1k4rRDTr-1
## Tech Stack Used

1. HTML5
2. CSS
3. JS
4. ReactJS(need to be converted for better performance)

## Get Started

1. After successfully setting up the project you can view the project on port `3000`
2. Give access to the camera and log in with your credentials as well.
3. Now scan the particular product QR and get all the details.
4. If the software couldn't find your product then our database is missing the product details inn it.
5. Add that particular product by following the above steps as mentioned above.

### Setup and Installation

1. **Fork and Clone the Repository**
   To get started with contributing to our project, fork the repo and then clone it to your local machine:
      ```bash
        git clone https://github.com/usha-madithati/esmart.github.io
        cd esmart.github.io
      ```

2. **Make Your Changes**
 Make the necessary modifications or additions to the project files.

3. **Commit and Push**
  Once you've made your changes, commit them and push to your fork:
  ```bash
      git add .
      git commit -m "Describe your changes here"
      git push
   ```

4. **Create a Pull Request**
  Navigate back to the original repository and open a pull request from your forked repository.

### Backend Setup

 - Navigate through the `backend` folder
 - Setup `.env` file and set `MONGO_URL` and other dev dependencies regarding in `.env.sample` and set your own .env file
 - Make the conection string and copy the string in the mongodb compass and start server in the mongodb cluster in compassUI or on website respectively
 -  Now install all dependencies required for backend setup `npm install`
 -  Now run the server with `npm start`
 -  Your backend server will be running on `PORT: 6352`


 ### Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:
- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

### Deployment
 - Login to your vercel here: https://vercel.com/login
 - Now select the forked repository on vercel
 - Now after selecting the repository select the root or default branch to     get  deployed.
   It can be seen here: https:vercel.com/new/clone?repository-url=https://github.com/usha-madithati/esmart.github.io
 - Check and test whole website application and its functionality
 - Add the live hosted link of changed website things in your PR.

Try our web application here: [https://esmartgit.vercel.app/](https://esmart-github-io-oq3w.vercel.app/)

![Smart saver Infographic](https://camo.githubusercontent.com/dd5e3080a7adc2ead8f86cbbd6577cee0a38439c0ebf195021ce41587b0a405f/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f313430302f312a633459675258595161794f5657785633376f757272772e706e67)

