const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    userLastname : {type: String, required: true},
    userFirstname : {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type:String, required: true},
    description : {type:String, required: true, minlength: 200},
    ingredients : {type: [String], default: []},
    imageUrl : {type:String, required: true},
    heat : {type:Number, required: true},
    likes :{type: Number, default: 0}, 
    dislikes : {type: Number, default: 0},
    usersLiked : {type: [String], default: []},
    usersDisliked : {type: [String], default: []},
});

module.exports = mongoose.model('Sauce', sauceSchema);