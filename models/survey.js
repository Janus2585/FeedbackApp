const mongoose = require('mongoose');
//const Schema = mongoose.Schema; can be rewritten as
const { Schema } = mongoose; 
const RecipientSchema = require('./recipient')

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },//Schema.Types.ObjectId makes mongoose setup a relationship with a specific user. underscore indicates a reference field
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema); 