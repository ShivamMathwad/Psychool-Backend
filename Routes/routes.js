var express = require("express");
const {spawn} = require('child_process');
var router = express.Router();

//Schema Setup
var OceanQuestions    = require("../Models/ocean_questions.js");
var RaisecQuestions    = require("../Models/interest_questions.js");
var User              = require("../Models/users.js");
var AptitudeQuestions = require("../Models/apti_questions.js");
var Email             = require("../email.js");

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
        recommendation: null,
        ocean_result: {},
        raisec_result: {},
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
        recommendation: null,
        ocean_result: {},
        raisec_result: {},
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
                        Email.signup_mail(createdUser.email, createdUser.username); //Send signup mail to user
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


//Get all Test scores
router.post("/getAllScores", function(req,res){
    var user = {
        o_result: null,
        c_result: null,
        e_result: null,
        a_result: null,
        n_result: null,
        numerical: null,
        perceptual: null,
        verbal: null,
        abstractApti: null,
        spatial: null
    };

    User.findOne({username: req.body.username},function(err, foundEntry){
        if(err){
            console.log(err);
            res.send(user);
        } else {
            user.o_result = foundEntry.ocean_result.o_result;
            user.c_result = foundEntry.ocean_result.c_result;
            user.e_result = foundEntry.ocean_result.e_result;
            user.a_result = foundEntry.ocean_result.a_result;
            user.n_result = foundEntry.ocean_result.n_result;
            user.numerical = foundEntry.numerical;
            user.perceptual = foundEntry.perceptual;
            user.verbal = foundEntry.verbal;
            user.abstractApti = foundEntry.abstractApti;
            user.spatial = foundEntry.spatial;
            res.send(user);
        }
    });
});


//Career Recommendation
router.post("/careerRecommendation", function(req,res){
    var dataToSend;
    //var ocean_result = [0.0,0.05,0.0,0.9];
    var ocean_result = req.body.ocean_result;
    var aptitude_result = [req.body.numerical, req.body.perceptual, req.body.verbal, req.body.abstractApti, req.body.spatial];

    // spawn new child process to call the python script
    const python = spawn('python', ['script.py',ocean_result, aptitude_result]);

    // collect data from script
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    });

    //dataToSend => Mass&Media,Engineering
    var recommendationList = dataToSend.split(",");
    User.findOneAndUpdate({username: req.body.username}, {recommendation: recommendationList}, function(err, updatedEntry){
        if(err){
            console.log(err);
        } else {
            console.log("Success");
        }
    });

    res.send(recommendationList);
});


//Handles forgot password logic
router.post("/forgot_password", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOne({username:req.body.username, email:req.body.email},function(err,foundEntry){
        if(err){
            console.log(err);
            res.send(status);
        } else {
            if(foundEntry == null){
                //Means account doesn't exist or one of username or email is invalid
                status.status = "Invalid details";
                res.send(status);
            } else {
                //Means user exists
                User.findOneAndUpdate({username: req.body.username}, {password: req.body.securePassword}, function(err,updatedEntry){
                    if(err){
                        console.log(err);
                    } else {
                        Email.forgot_password_mail(foundEntry.email, foundEntry.username, req.body.password);  //Send forgot_password mail to user
                    }
                });

                status.status = "Success";
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
            Email.password_change_success_mail(updatedEntry.email, updatedEntry.username); //Send mail to user
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


//Get Interest questions from DB
router.get("/getInterestQuestions", function(req,res){
    
    RaisecQuestions.find({}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
           allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);
           
           let UpdateObjectsArray=[];
           for(let question in allQuestions){
               let obj = {
                   id: allQuestions[question].id,
                   question: allQuestions[question].question,
                   type: allQuestions[question].type
               };
               UpdateObjectsArray.push(obj);
           }
           res.send(UpdateObjectsArray);
        }
    });
});


//Store RAISEC results in DB
router.post("/storeRaisecResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {raisec_result: req.body.raisec_result}, function(err,updatedEntry){
        if(err){
            console.log(err);
            res.send(status);
        } else {
            status.status = "Success";
            console.log("success");
            res.send(status);
        }
    });
});


//Get Interest results from DB
router.post("/getRaisecResult", function(req,res){
    const noTestResult = {
        r_result: 0,
        a_result: 0,
        i_result: 0,
        s_result: 0,
        e_result: 0,
        c_result: 0
    };    

    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            res.send(noTestResult);
        } else {
            if(Object.keys(foundEntry.raisec_result).length === 0 ){
                //Means user has not given the test
                res.send(noTestResult);
            } else {
                //User has given the test
                res.send(foundEntry.raisec_result);
            }
        }
    });
});

module.exports = router;