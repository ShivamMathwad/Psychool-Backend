var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    ocean_result:Object,
    aptitude_result:Object
});

var User = mongoose.model("users",userSchema,"users");

module.exports = User;