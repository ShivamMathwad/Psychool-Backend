var mongoose = require("mongoose");

var gradQuestionSchema = new mongoose.Schema({
    id: Number,
    question: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    correctOption: String,
    type: String 
});

var GradQuestions = mongoose.model("graduate_aptitude",gradQuestionSchema,"graduate_aptitude");

module.exports = GradQuestions;