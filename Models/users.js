var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    user_type: String,
    ocean_result: Object,
    numerical: Number,
    perceptual: Number,
    verbal: Number,
    abstractApti: Number,
    spatial: Number
},{minimize:false});
//minimize:false will also to store empty objects in DB

var User = mongoose.model("users",userSchema,"users");

module.exports = User;