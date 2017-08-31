const passport = require('passport');

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
module.exports = app => {


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
};