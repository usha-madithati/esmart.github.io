# Smart Saver

[![Stars](https://img.shields.io/github/stars/usha-madithati/esmart.github.io?style=social)](https://github.com/usha-madithati/esmart.github.io/stargazers)
[![Forks](https://img.shields.io/github/forks/usha-madithati/esmart.github.io?style=social)](https://github.com/usha-madithati/esmart.github.io/network/members)
[![Issues](https://img.shields.io/github/issues/usha-madithati/esmart.github.io)](https://github.com/usha-madithati/esmart.github.io/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/usha-madithati/esmart.github.io)](https://github.com/usha-madithati/esmart.github.io/pulls)
[![Maintenance](https://img.shields.io/maintenance/yes/2024)](https://github.com/usha-madithati/esmart.github.io)

## About

Welcome to Smart Saver, a website designed to help households and supermarkets manage their food inventory efficiently. Our platform empowers users to track product expiry dates by scanning QR codes, set alarms for impending expirations, and ultimately save money on daily purchases.

Explore our web application: [Smart Saver](https://esmart-github-io.vercel.app/)

---

### STEPS TO PROCEED:

## Logging In:

- Navigate to the login page.
- Enter your credentials (`email`, `password`).
- Receive the required response from the server in toast or text form.
- Ensure the server is running.
- If not logged in, navigate to the signup page (`/signup`).

## Registering (Local):

- Ensure the backend is set up correctly and the server is running.
- Fill in all required fields (`name`, `email`, `phone number`, `password`).
- Receive the required response from the server in toast or textual error form.
- After successful registration, automatically navigate to the `/login` page.
- Log in to the application as per the above steps.

## Authorization Tokens:

- Ensure JWT and BcryptJS are used for authorization.
- Obtain the Authorization token after logging in.
- The token is valid for the next hour.
- Utilize application services while the token is valid.

---

### Twilio Account Setup:

1. **Sign Up for Twilio**:
   - Go to [Twilio's website](https://www.twilio.com/try-twilio) and sign up for a new account if you haven't already.

2. **Get Twilio API Credentials**:
   - Note down your Account SID and Auth Token from the Twilio dashboard.

3. **Purchase a Phone Number**:
   - Obtain a phone number from Twilio for sending SMS notifications.

4. **Install Twilio SDK**:
   - Install the Twilio Node.js package in your project:
     ```bash
     npm install twilio
     ```

5. **Integrate Twilio into Your Backend**:
   - Use the Twilio SDK to send SMS notifications from your backend.
   - Initialize Twilio with your Account SID and Auth Token.
   - Craft and send notification messages using Twilio's API.

6. **Test SMS Notifications**:
   - Ensure users receive notifications correctly.

7. **Handle Errors and Edge Cases**:
   - Implement error handling for failed SMS delivery or invalid phone numbers.
   - Consider retry mechanisms for failed deliveries.

8. **Monitor Usage and Costs**:
   - Keep track of Twilio API usage and associated costs.

9. **Document Integration Steps**:
   - Update project documentation with detailed Twilio setup instructions.

10. **Final Testing and Deployment**:
    - Deploy the updated project with Twilio integration.

---

## Review Section: 
Share your feedback and insights with the Smart Savers community to improve the platform.

## QR Code Scanning: 
Effortlessly scan QR codes to access instant product information.

## Announcements tab

 - In the admin dashboard we have made the announcement tab in which the admin can make announcements regarding the updates and tech needs so that the registered users or developers can have the email regarding the updation in the web application.


---


 https://www.figma.com/design/naU9W2cQQa04wB6WsEjkr2/Untitled?node-id=0%3A1&t=DazRyOMA1k4rRDTr-1
## Tech Stack Used

1. HTML5
2. CSS
3. JS
4. ReactJS(need to be converted for better performance)
5. MongoDB 
6. Express JS
7. Node JS
8. SuperJEST
9. Tailwind 
10. Twilio

## Get Started

1. After successfully setting up the project you can view the project on port `3000`
2. Give access to the camera and log in with your credentials.
3. Now scan the particular product QR and get all the details.
4. If the software couldn't find your product then our database is missing the product details in it.
5. Add that particular product by following the abovementioned steps.

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

# Backend Setup:

1. Navigate through the backend folder
2. Setup .env file and set MONGO_URL and other dev dependencies regarding in .env.sample and set your .env file
3. Make the connection string and copy the string in the Mongodb compass and start the server in the MongoDB cluster in compassUI or on the website respectively
4. Now install all dependencies required for backend setup npm install
5> Now run the server with npm start
6> Your backend server will be running on PORT: `6352`

### Running Setup:
1> To ensure the robustness of our application, we use Jest and Supertest for testing.

Setting up `Jest` and `Supertest`
Install Dependencies
```
npm install jest supertest --save-dev

```
2> Create Test Files Create test files in the tests folder (or another preferred directory).

3> Writing Tests Use Jest and Supertest to write your tests.

4> Run Tests To run the tests, use the following command: npm test

5> You can also add a script in your package.json for convenience:
```
"scripts": { "test": "jest" }
```
## Contributing
We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

## Deployment

1. Login to your vercel here: https://vercel.com/login
2. Now select the forked repository on vercel website in your dashboard.
3. After selecting the repository select the root or default branch to get deployed.


# Backend Deployment:

1. For Backend setup and server changes we have different approaches in our project.
2. We have the server on a different repo on which the specific interested project contributors have access to it.
3. Soon we will add the functionality of adding the specific interested contributors through our web application.
4. Now if you tested the application and believe that it has your functionality or bug has been fixed as well then raise the PR(Pull Request).

## Using the Website

Welcome to Smart Saver! This section provides a brief guide on how to navigate and utilize the features of our website effectively.

### Logging In

1. **Navigate to the Login Page**
   - Access the login page by clicking on the "Login" button in the navigation bar.

2. **Enter Your Credentials**
   - Provide your email address and password in the designated fields.

3. **Receive Authentication**
   - Upon successful authentication, you will receive confirmation either through a toast notification or a text message.

### Registering as a New User

1. **Access the Signup Page**
   - If you're not registered yet, click on the "Signup" link to navigate to the registration page (`/signup`).

2. **Complete Registration**
   - Fill out all required fields including your name, email, phone number, and password.

3. **Confirmation**
   - After successful registration, you will automatically be redirected to the login page (`/login`).

### Managing Inventory with QR Codes

1. **Scanning QR Codes**
   - Use the QR code scanner feature to instantly retrieve detailed information about products.

2. **Product Information**
   - If a product is not found in our database, you can add it by following the provided steps.

### Notifications with Twilio

1. **Setting Up Twilio**
   - Sign up for Twilio and obtain API credentials (Account SID and Auth Token).

2. **Sending SMS Notifications**
   - Integrate Twilio into your backend to send SMS notifications for product expirations or updates.

### Admin Dashboard Features

1. **Announcements**
   - Admins can make announcements regarding updates and technical needs using the admin dashboard.

2. **Monitoring and Maintenance**
   - Keep track of system updates and user feedback to improve the platform continuously.

### Tech Stack Used

Our platform leverages a modern tech stack including HTML5, CSS, JavaScript, ReactJS, MongoDB, ExpressJS, NodeJS, Tailwind CSS, and Twilio for enhanced functionality and performance.

Explore more about our application on our [Smart Saver](https://esmart-github-io.vercel.app/) website.



![Smart saver Infographic](https://camo.githubusercontent.com/dd5e3080a7adc2ead8f86cbbd6577cee0a38439c0ebf195021ce41587b0a405f/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f313430302f312a633459675258595161794f5657785633376f757272772e706e67)
