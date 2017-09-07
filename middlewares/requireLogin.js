module.exports = (req, res, next) => { //next is a function called when the middleware is complete. 
	if (!req.user) {
		return res.status(401).send({ error: 'Please log in.' });//next is not used because we want to terminate the request ASAP and send back an error
	}

	next();
};