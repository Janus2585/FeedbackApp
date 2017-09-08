module.exports = (req, res, next) => { //next is a function called when the middleware is complete. 
	if (req.user.credits < 1) {
		return res.status(403).send({ error: 'Not enough credits.' });//next is not used because we want to terminate the request ASAP and send back an error
	}

	next();
};