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

	app.get('/api/logout', (req,res) => {
		//kills the cookie of the logged in user
		req.logout();
		//prove the user is not logged in. Should return blank screen
		res.redirect('/');
	});

	app.get(
		"/auth/google/callback", 
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');	
		}
	);

	//arrow function is automatically called whenver a get request is made to the /api/current_user route
	//req is the incoming request, res is the outgoing response
	//returns users who are logged in
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

};