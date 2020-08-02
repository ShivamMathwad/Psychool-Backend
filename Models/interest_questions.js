var mongoose = require("mongoose");

var interestQuestionSchema = new mongoose.Schema({
    id: Number,
    question: String,
    type: String 
});

var InterestQuestions = mongoose.model("interest",oceanQuestionSchema,"interest");

module.exports = InterestQuestions;