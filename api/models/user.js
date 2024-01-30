const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//User schema mongoose
const userSchema = new mongoose.Schema({
	lastname: { type: String, required: true },
	firstname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);

//Export schema
module.exports = mongoose.model('User', userSchema);