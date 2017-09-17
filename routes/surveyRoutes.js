const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

//this fixes the mongoose mpromise deprecation warning
mongoose.Promise = global.Promise;

module.exports = app => {
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for your feedback!');
	});

	

	app.post('/api/surveys/webhooks', (req, res) => {
		//we only want to store unique responses to each survey. Each user gets 1 vote.
		//first use .map to extract the path from the URL 
		//extract the surveyID and choice
		//return survey ID, email, and choice, disregarding records without surveyID and choice
		//remove records that are undefined
		//remove records with dupicate email and surveyId

		//_.chain() is used to combine all the lodash helpers into one
		const p = new Path('/api/surveys/:surveyId/:choice');
		_.chain(req.body)
			.map(({ email, url }) => { // for every element in req.body
				const match = p.test(new URL(url).pathname); //returns object with surveyID and choice
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice }; // return email, surveyID, and yes/no
				}
			})
			.compact()//lodash helper that removes undefined events
			.uniqBy('email', 'surveyId') //check for unique surveys
			.each(({ surveyId, email, choice }) => { //run over every element in the events array
				Survey.updateOne({ //update a record in the Survey collection
					_id: surveyId, //the record must have this id. MongoDB syntax requires the key to be _id
					recipients: {
						$elemMatch: { email: email, responded: false } //the record must have these properties
					}
				}, {
					$inc: { [choice]: 1 }, //choice can be yes or no. Increment the choice by 1
					$set: { 'recipients.$.responded': true },//go in the subdocuments collection, find the recipient who was found using $elemMatch, set the responded property to true 
					lastResponded: new Date()
				}).exec();
			})
			.value(); //return the filtered survey list
	

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
		
		try { //if anything goes wrong, catch the request and send back the response
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