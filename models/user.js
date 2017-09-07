const mongoose = require('mongoose');
//const Schema = mongoose.Schema; can be rewritten as
const { Schema } = mongoose; 

const userSchema = new Schema ({
	googleID: String,
	credits: { type: Number, default: 0 }//type number, default value of 0
});

mongoose.model('users', userSchema);