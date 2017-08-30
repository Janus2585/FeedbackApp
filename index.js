//get express.js framework
const express = require('express');

//node js does not have support for ES 2015 modules. This is why import express from 
//'express' is not used and "require is used instead"

//app is used to set up configuration to route request to different handlers
const app = express();

//create route handler and associate it with a given route
//app: Express App to register this route handler 
//get: watch for incoming requests with this method
//'/': watch for requests trying to access '/'. / indicates it is trying to access the root route (localhost:5000/). If this was '/greeting' instead, then it can be accessed by going to localhost:5000/greeting
//req: object representing the incoming request
//res: object representing the outgoing response
//res.send({hi: 'there'}): immediately send some JSON back to whatever made this request
app.get('/', (req, res) => {
	res.send({ hi: 'there'});
});

//listen on localhost:5000
app.listen(5000);
