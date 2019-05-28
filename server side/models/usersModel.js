const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var users_Schema = new Schema({
    firstName: String,
    lastName: String,
    username:String,
    password: Number,
    userId:Number,
    city:String,
    street:String,
    role:String
});

users_Schema.plugin(passportLocalMongoose);

var usersModel = mongoose.model('users', users_Schema);

module.exports = usersModel;

