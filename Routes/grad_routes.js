var express = require("express");
var router = express.Router();

//Schema Setup
var User              = require("../Models/users.js");
var GradQuestions     = require("../Models/grad_questions.js");


//Routes     
//Get Medical questions from DB
router.get("/getMedicalQuestions", function(req,res){

    GradQuestions.find({type: "Medical"}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
            allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allQuestions){
                let obj = {
                    id: allQuestions[question].id,
                    question: allQuestions[question].question,
                    optionA: allQuestions[question].optionA,
                    optionB: allQuestions[question].optionB,
                    optionC: allQuestions[question].optionC,
                    optionD: allQuestions[question].optionD,
                    correctOption: allQuestions[question].correctOption,
                    type: allQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });
});


//Get Political questions from DB
router.get("/getPoliticalQuestions", function(req,res){

    GradQuestions.find({type: "Public and Political Affairs"}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
            allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allQuestions){
                let obj = {
                    id: allQuestions[question].id,
                    question: allQuestions[question].question,
                    optionA: allQuestions[question].optionA,
                    optionB: allQuestions[question].optionB,
                    optionC: allQuestions[question].optionC,
                    optionD: allQuestions[question].optionD,
                    correctOption: allQuestions[question].correctOption,
                    type: allQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });
});


//Get Management questions from DB
router.get("/getManagementQuestions", function(req,res){

    GradQuestions.find({type: "Management"}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
            allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allQuestions){
                let obj = {
                    id: allQuestions[question].id,
                    question: allQuestions[question].question,
                    optionA: allQuestions[question].optionA,
                    optionB: allQuestions[question].optionB,
                    optionC: allQuestions[question].optionC,
                    optionD: allQuestions[question].optionD,
                    correctOption: allQuestions[question].correctOption,
                    type: allQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });
});


//Get Computer questions from DB
router.get("/getComputerQuestions", function(req,res){

    GradQuestions.find({type: "CSE/IT Apti"}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
            allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allQuestions){
                let obj = {
                    id: allQuestions[question].id,
                    question: allQuestions[question].question,
                    optionA: allQuestions[question].optionA,
                    optionB: allQuestions[question].optionB,
                    optionC: allQuestions[question].optionC,
                    optionD: allQuestions[question].optionD,
                    correctOption: allQuestions[question].correctOption,
                    type: allQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });
});


//Get Mechanical questions from DB
router.get("/getMechanicalQuestions", function(req,res){

    GradQuestions.find({type: "Mechanical Apti"}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
            allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allQuestions){
                let obj = {
                    id: allQuestions[question].id,
                    question: allQuestions[question].question,
                    optionA: allQuestions[question].optionA,
                    optionB: allQuestions[question].optionB,
                    optionC: allQuestions[question].optionC,
                    optionD: allQuestions[question].optionD,
                    correctOption: allQuestions[question].correctOption,
                    type: allQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });
});


//Get Aerospace questions from DB
router.get("/getAerospaceQuestions", function(req,res){

    GradQuestions.find({type: "Aerospace Apti"}, function(err,allQuestions){
        if(err){
            console.log(err);
        } else {
            allQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allQuestions){
                let obj = {
                    id: allQuestions[question].id,
                    question: allQuestions[question].question,
                    optionA: allQuestions[question].optionA,
                    optionB: allQuestions[question].optionB,
                    optionC: allQuestions[question].optionC,
                    optionD: allQuestions[question].optionD,
                    correctOption: allQuestions[question].correctOption,
                    type: allQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });
});


//Store user's Medical result in DB
router.post("/storeMedicalResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {medical: req.body.medical}, function(err,updatedEntry){
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


//Store user's Political result in DB
router.post("/storePoliticalResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {political: req.body.political}, function(err,updatedEntry){
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


//Store user's Management result in DB
router.post("/storeManagementResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {management: req.body.management}, function(err,updatedEntry){
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


//Store user's Computer result in DB
router.post("/storeComputerResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {computer: req.body.computer}, function(err,updatedEntry){
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


//Store user's Mechanical result in DB
router.post("/storeMechanicalResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {mechanical: req.body.mechanical}, function(err,updatedEntry){
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


//Store user's Aerospace result in DB
router.post("/storeAerospaceResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {aerospace: req.body.aerospace}, function(err,updatedEntry){
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


//Get Medical result from DB
router.post("/getMedicalResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        result: null,
        id:""
    };

    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            status.status = "Test Not Given";
            res.send(status);
        } else {
            if(foundEntry.medical == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.medical;
                res.send(status);
            }
        }
    });
});


//Get Political result from DB
router.post("/getPoliticalResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        result: null,
        id:""
    };

    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            status.status = "Test Not Given";
            res.send(status);
        } else {
            if(foundEntry.political == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.political;
                res.send(status);
            }
        }
    });
});


//Get Management result from DB
router.post("/getManagementResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        result: null,
        id:""
    };

    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            status.status = "Test Not Given";
            res.send(status);
        } else {
            if(foundEntry.management == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.management;
                res.send(status);
            }
        }
    });
});


//Get Computer result from DB
router.post("/getComputerResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        result: null,
        id:""
    };

    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            status.status = "Test Not Given";
            res.send(status);
        } else {
            if(foundEntry.computer == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.computer;
                res.send(status);
            }
        }
    });
});


//Get Mechanical result from DB
router.post("/getMechanicalResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        result: null,
        id:""
    };

    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            status.status = "Test Not Given";
            res.send(status);
        } else {
            if(foundEntry.mechanical == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.mechanical;
                res.send(status);
            }
        }
    });
});


//Get Aerospace result from DB
router.post("/getAerospaceResult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        result: null,
        id:""
    };

    User.findOne({username: req.body.username}, function(err,foundEntry){
        if(err){
            console.log(err);
            status.status = "Test Not Given";
            res.send(status);
        } else {
            if(foundEntry.aerospace == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.aerospace;
                res.send(status);
            }
        }
    });
});


module.exports = router;