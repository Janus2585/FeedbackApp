# FeedbackApp


See the deployed application on Heroku: https://stormy-shelf-82273.herokuapp.com/

FeedbackApp is a full stack application that allows the user to login with their Google credentials, create surveys to send to their email list, and view the responses instantly. 

I learned a tremendous amount building this application. I used Google OAuth 2.0 to securely create user profiles. React.js comprises the entire front end of the application, with the Header, Landing page, Dashboard, and Surveys being separate components. Each user's profile ID, previous surveys, survey responses, and number of credits are all stored using Node.js in a MongoDB database in mLab. Stripe's API is used to securely accept credit card payments to buy credits in the application. Form validation ensures the user enters valid inputs in each field. FeedbackApp is currently deployed to Heroku.

# How to use FeedbackApp
1. Login with your Google account
2. Add credits to your account at the top right. The application is in test mode and does not accept real credit cards. To add credits to your account, enter the following credentials: Credit Card #: 4242 4242 4242 4242. Any expiration date and CVV can be used. 
3. Create a new survey by clicking the + icon at the bottom right of the screen.
4. Fill out the survey info, with each email separated by a comma and a space (example1@gmail.com, example2@gmail.com, example3@gmail.com)
5. Confrim the survey info to send the survey. 
6. Yes/No responses to each survey you send can be viewed on your dashboard. 


