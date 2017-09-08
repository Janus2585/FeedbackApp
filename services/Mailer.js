const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) { //take the list of recipients
		super();

		this.from_email = new helper.Email('no-reply@feedbackapp.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients); //pass list of recipients to formatAddresses
	
		this.addContent(this.body);//register this.body with the Mailer
		this.addClickTracking();//enable click tracking
		this.addRecipients();
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
}	
