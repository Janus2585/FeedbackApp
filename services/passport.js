const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

//using .model, one argument means we are fetching something from mongoose, two arguments means we are trying to load something into it.
const User = mongoose.model("users");

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			//.findOne returns a promise. 
			User.findOne({ googleID: profile.id })
				//get an indication of when the query has completed
				//existingUser is a model instance of the user that was found
				.then((existingUser) => {
					if (existingUser) {
						//we already have a record of the given profile ID
					} else {
						//add this new user to the database
						new User({ googleID: profile.id }).save();
					}
				})
			
		}
	)
);
