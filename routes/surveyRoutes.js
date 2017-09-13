const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for your feedback!')
	});

	//we only want to store unique responses to each survey. Each user gets 1 vote.
	//first use .map to extract the path from the URL 
	//extract the surveyID and choice
	//return survey ID, email, and choice, disregarding records without surveyID and choice
	

	//remove records that are undefined

	//remove records with dupicate email and surveyId


	app.post('/api/surveys/webhooks', (req, res) => {
		console.log(req.body);
		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => { //check if user is logged in and has credits before proceeding
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title, //ES6 syntax. same as title: title
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })), //seprate the string of emails into an array of strings, then return an object for every email with the property email that points at the user's email
			//yes and no properties are already defaulted to 0
			_user: req.user.id,//req.user.id is available on any mongoose model
			dateSent: Date.now() //assumes the survey is sent now
		});

		//Send email here
		const mailer = new Mailer(survey, surveyTemplate(survey));
		
		try{ //if anything goes wrong, catch the request and send back the response
			await mailer.send();//asynch function. await is there to prevent future code from executing before mailer.send() is complete
			await survey.save();//save survey to the database
			req.user.credits -= 1; //take away 1 credit
			const user = await req.user.save(); //save the new user, 

			res.send(user);
		} catch (err) {
			res.status(422).send(err)// send the error response to the user
		}
		

	});
};