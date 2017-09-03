const mongoose = require('mongoose');
//const Schema = mongoose.Schema; can be rewritten as
const { Schema } = mongoose; 

const userSchema = new Schema ({
	googleID: String
});

mongoose.model('users', userSchema);