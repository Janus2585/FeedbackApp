const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey
);


module.exports = app => {
	app.post('/api/stripe', (req, res) => {
		//handle token, reach out to Stripe API
		stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description:'5 dollars for 5 credits',
			source: req.body.id
		});
	});
};