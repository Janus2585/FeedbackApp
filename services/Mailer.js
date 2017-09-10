const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) { //take the list of recipients
		super();

		this.sgAPI = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email('no-reply@feedbackapp.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients); //pass list of recipients to formatAddresses
	
		this.addContent(this.body);//register this.body with the Mailer. this function is defined by the base class
		this.addClickTracking();//enable click tracking. this function is defined below
		this.addRecipients();//process the list of recipients. this function is defined below
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => { //For every recipient in the array we pull out the email property. extra set of () around email is necessary for destructuring with an arrow function. 
			return new helper.Email(email); //format the email with helper
		});
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();
		//iterate over the list of recipients in this.recipients, and for each make use of personalize
		this.recipients.forEach(recipient => { 
			personalize.addTo(recipient); //add each recipient to the personalize object
		});
		this.addPersonalization(personalize);//add the entire personalize object to this
		
	}

	async send() {
		//create sendgrid API request
		const request = this.sgAPI.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		const response = await this.sgAPI.API(request);//send the request
		return response;
	}
}	

module.exports = Mailer;