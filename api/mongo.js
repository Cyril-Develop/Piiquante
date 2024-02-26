const mongoose = require('mongoose');
const USER = process.env.USER_DB;
const PASSWORD = process.env.PASSWORD_DB;
const DATABASE = process.env.NAME_DATABASE;
const uri = `mongodb+srv://${USER}:${PASSWORD}@${DATABASE}.hndxnok.mongodb.net/?retryWrites=true&w=majority`;

//Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(uri)
	.then(() => console.log('connected to Mongo'))
	.catch(error => console.error({error}));	