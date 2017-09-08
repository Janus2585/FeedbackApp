//get express.js framework
const express = require("express");
//get the mongoose.js framework
const mongoose = require('mongoose');
//libraries to enable the use of cookies 
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//bodyParser is middleware. 
const bodyParser = require('body-parser');
require('./models/user');
require('./models/survey')
require('./services/passport');

mongoose.connect(keys.mongoURI);


//app is used to set up configuration to route request to different handlers
const app = express();

//Middleware is wired to express using the app.use call
app.use(bodyParser.json());
//enable the use of cookies
app.use(
	cookieSession({
		//how long the cookie can exist before it expires
		//converting 30 days to miliseconds
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
//tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//this section of code should only run when in production, when the app is in Heroku
if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assets
	//for example, main.js or main.css
	//this is meant to respond to a request for a specific file
	//for example, /client/build/static/js/main.js
	app.use(express.static('client/build')); //if a request comes for a route that does not have a route handler, then look in the client/build directory to find the file
	//if the file cannot be found using the line above, it will execute the code below
	
	//Express will serve up the index.html file 
	//if it doesn't recognize the route
	//this is meant to be a catch-all if the route is not handled above
	//this assumes React-router knows what to do with this route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}


//dynamically determine which port to listen to to make it compatible with Heroku
//If there is an env variable assigned by Heroku, then assign that to PORT.
//If env is not defined (for example in a development environment), then assign it 5000;
const PORT = process.env.PORT || 5000;
//listen on PORT
app.listen(PORT);
