var mongoose = require("mongoose");

var oceanSchema = new mongoose.Schema({
    id: Number,
    question: String,
    reverse: String,
    type: String 
});

var Ocean = mongoose.model("personality",oceanSchema,"personality");

module.exports = Ocean;