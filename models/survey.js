const mongoose = require('mongoose');
//const Schema = mongoose.Schema; can be rewritten as
const { Schema } = mongoose; 

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [String] //array containing a list of strings

});

mongoose.model('surveys', surveySchema);