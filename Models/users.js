var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    user_type: String,
    recommendation: Array,
    ocean_result: Object,
    raisec_result: Object,
    numerical: Number,
    perceptual: Number,
    verbal: Number,
    abstractApti: Number,
    spatial: Number,
    medical: Number,
    management: Number,
    political: Number,
    computer: Number,
    mechanical: Number,
    aerospace: Number
},{minimize:false});
//minimize:false will also to store empty objects in DB

var User = mongoose.model("users",userSchema,"users");

module.exports = User;