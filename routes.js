var express = require("express");
var router = express.Router();

//Schema Setup
var Ocean = require("./Models/ocean_questions.js");

//Routes
router.get("/", function(req,res){
    res.send("<b>Psychool Backend</b>");
});

router.get("/getQuestions", function(req,res){
    
    Ocean.find({}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
           allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);
           
           let UpdateObjectsArray=[];
           for(let question in allQuestions){
               let obj = {
                   id: allQuestions[question].id,
                   question: allQuestions[question].question,
                   type: allQuestions[question].type,
                   reverse: allQuestions[question].reverse
               }
               UpdateObjectsArray.push(obj);
           }
           
           res.send(UpdateObjectsArray);
        }
    });
    
});


module.exports = router;