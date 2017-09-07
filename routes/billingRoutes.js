const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey
);


module.exports = app => {
	app.post('/api/stripe', async (req, res) => {
		//handle token, reach out to Stripe API
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description:'5 dollars for 5 credits',
			source: req.body.id //obtained from stripe.js
		});
		req.user.credits += 5;	//access the current user to add credits to their account
		const user = await req.user.save();//save the change. this is an asynch request. assign user to req.user to ensure the lastest version of user is used in the future
		res.send(user)//send the updated user info back to the browser
	});
};