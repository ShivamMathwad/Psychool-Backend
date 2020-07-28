var express = require("express");
var router = express.Router();

//Schema Setup
var OceanQuestions    = require("../Models/ocean_questions.js");
var User              = require("../Models/users.js");
var AptitudeQuestions = require("../Models/apti_questions.js");


//Routes
router.get("/", function(req,res){
    res.send("<b>Psychool Backend</b>");
});


//Handles signup logic
router.post("/signup", function(req,res){
    var user;
    var school_user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        user_type: req.body.user_type,
        ocean_result: {},
        numerical: null,
        perceptual: null,
        verbal: null,
        abstractApti: null,
        spatial: null
    };
    var grad_user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        user_type: req.body.user_type,
        ocean_result: {},
        medical: null,
        management: null,
        political: null,
        computer: null,
        mechanical: null,
        aerospace: null
    };
    var status = {
        status: "",
        username: req.body.username,
        id: ""
    };

    if(req.body.user_type == "School/High School"){
        user = school_user;
    } else {
        user = grad_user;
    }

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
        user_type: "",
        email: "",
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
                status.user_type = foundEntry.user_type;
                status.email = foundEntry.email;
                status.id = String(foundEntry._id);
                res.send(status);
            }
        }
    });
});


//Change user password
router.post("/changePassword", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {password: req.body.password}, function(err,updatedEntry){
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
               };
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
    const noTestResult = {
        o_result: 0,
        c_result: 0,
        e_result: 0,
        a_result: 0,
        n_result: 0
    };    

    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            res.send(noTestResult);
        } else {
            if(Object.keys(foundEntry.ocean_result).length === 0 ){
                //Means user has not given the test
                res.send(noTestResult);
            } else {
                //User has given the test
                res.send(foundEntry.ocean_result);
            }
        }
    });
});

module.exports = router;