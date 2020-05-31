var express = require("express");
var router = express.Router();

//Schema Setup
var OceanQuestions = require("./Models/ocean_questions.js");
var User = require("./Models/users.js");

//Routes
router.get("/", function(req,res){
    res.send("<b>Psychool Backend</b>");
});

//Handles signup logic
router.post("/signup", function(req,res){
    var user = {
        "username":req.body.username,
        "password":req.body.password,
        "ocean_result":[],
        "aptitude_result":[]
    };
    var status = {
        "status":"",
        "username":req.body.username,
        "id":""
    };

    User.findOne({username:req.body.username},function(err,foundEntry){
        if(err){
            //Means username is not already present in db, so now we can add our entry
            User.insertOne(user, function(err,createdUser){
                if(err){
                    console.log(err);
                } else {
                    status.status = "Success";
                    status.id = String(createdUser._id);
                    res.send(status);
                }
            });
        }
        else{
            status.status = "Username already exists";
            res.send(status);
        }
    });
});

//Get Personality questions from DB
router.get("/getQuestions", function(req,res){
    
    OceanQuestions.find({}, function(err,allQuestions){
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