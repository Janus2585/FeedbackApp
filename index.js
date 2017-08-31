//get express.js framework
const express = require("express");
require('./services/passport')


//app is used to set up configuration to route request to different handlers
const app = express();

require('./routes/authRoutes')(app);

//dynamically determine which port to listen to to make it compatible with Heroku
//If there is an env variable assigned by Heroku, then assign that to PORT.
//If env is not defined (for example in a development environment), then assign it 5000;
const PORT = process.env.PORT || 5000;
//listen on PORT
app.listen(PORT);
