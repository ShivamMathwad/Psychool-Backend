var mongoose = require("mongoose");

var aptiQuestionSchema = new mongoose.Schema({
    id: Number,
    question: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    correctOption: String,
    type: String 
});

var AptitudeQuestions = mongoose.model("aptitude",aptiQuestionSchema,"aptitude");

module.exports = AptitudeQuestions;