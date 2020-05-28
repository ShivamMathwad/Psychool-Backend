var express = require("express");
var router = express.Router();

//Schema Setup
var Ocean = require("./Models/ocean_questions.js");
var array = [];

router.get("/getQuestions", function(req,res){
    console.log("Requested Questions");
    
    Ocean.find({}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
            /*
            allQuestions.forEach(function(Question){
                console.log(Question.question);
            });
            */
           allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);
           
           let UpdateQuestionsArray=[];
           for(let question in allQuestions){
               let obj = {
                   id:allQuestions[question].id,
                   question:allQuestions[question].question,
                   type:allQuestions[question].type,
                    reverse:allQuestions[question].reverse
               }
               UpdateQuestionsArray.push(obj);
           }

           console.log("Sending bacl kquestions");
           
           
           res.send(UpdateQuestionsArray);
        }
    });
    
});

module.exports = router;