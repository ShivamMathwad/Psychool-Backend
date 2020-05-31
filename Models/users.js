var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    ocean_result:Array,
    aptitude_result:Array
});

var User = mongoose.model("users",userSchema,"users");

module.exports = User;