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
        username:req.body.username,
        password:req.body.password,
    };
    var status = {
        status:"",
        username:req.body.username,
        id:""
    };

    User.findOne({username:req.body.username},function(err,foundEntry){
        if(err){
            console.log(err);
            res.send(status);
        } else {
            if(foundEntry == null){
                //Means username is not already present in db, so now we can add our entry
                User.create(user, function(err,createdUser){
                    if(err){
                        console.log(err);
                    } else {
                        status.status = "Success";
                        status.id = String(createdUser._id);
                        res.send(status);
                    }
                });
            } else {
                //Means username is already present in DB, so user has to put in a different username
                status.status = "Username already exists";
                res.send(status);
            }
        }
    });
});

//Handles login logic
router.post("/login", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOne({username:req.body.username, password:req.body.password},function(err,foundEntry){
        if(err){
            console.log(err);
            res.send(status);
        } else {
            if(foundEntry == null){
                //Means account doesn't exist or one of username or password is invalid
                status.status = "Invalid details";
                res.send(status);
            } else {
                status.status = "Success";
                status.id = String(foundEntry._id);
                res.send(status);
            }
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

//Store Ocean results in DB
router.post("/storeOceanResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {ocean_result: req.body.ocean_result}, function(err,updatedEntry){
        if(err){
            console.log(err);
            res.send(status);
        } else {
            status.status = "Success";
            status.id = String(updatedEntry._id);
            res.send(status);
        }
    });
});

//Get Ocean results from DB
router.post("/getOceanResult", function(req,res){
    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            res.send(foundEntry.ocean_result);
        } else {
            res.send(foundEntry.ocean_result);
        }
    });
});


module.exports = router;