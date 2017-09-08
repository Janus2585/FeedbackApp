const mongoose = require('mongoose');
//const Schema = mongoose.Schema; can be rewritten as
const { Schema } = mongoose; 

const RecipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

module.exports = RecipientSchema;