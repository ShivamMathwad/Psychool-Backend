var mongoose = require("mongoose");

var oceanQuestionSchema = new mongoose.Schema({
    id: Number,
    question: String,
    reverse: String,
    type: String 
});

var OceanQuestions = mongoose.model("personality",oceanQuestionSchema,"personality");

module.exports = OceanQuestions;