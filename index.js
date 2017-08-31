//get express.js framework
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys.js");

//app is used to set up configuration to route request to different handlers
const app = express();
//Tutorial code
//create route handler and associate it with a given route
//app: Express App to register this route handler
//get: watch for incoming requests with this method
//'/': watch for requests trying to access '/'. / indicates it is trying to access the root route (localhost:5000/). If this was '/greeting' instead, then it can be accessed by going to localhost:5000/greeting
//req: object representing the incoming request
//res: object representing the outgoing response
//res.send({hi: 'there'}): immediately send some JSON back to whatever made this request
/* 
app.get('/', (req, res) => {
	res.send({ subsequentDeployTest: 'success'});
});
*/

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile', profile);
		}
	)
);

//adding a single route handler for google OAuth
app.get(
	"/auth/google",
	passport.authenticate("google", {
		//requesting the user's profile and email address from google
		scope: ["profile", "email"]
	})
);

app.get(
	"/auth/google/callback", 
	passport.authenticate('google'));

//dynamically determine which port to listen to to make it compatible with Heroku
//If there is an env variable assigned by Heroku, then assign that to PORT.
//If env is not defined (for example in a development environment), then assign it 5000;
const PORT = process.env.PORT || 5000;
//listen on PORT
app.listen(PORT);
