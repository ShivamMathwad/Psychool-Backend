var express = require("express");
var router = express.Router();

//Schema Setup
var User              = require("../Models/users.js");
var AptitudeQuestions = require("../Models/apti_questions.js");


//Routes

//Tells the user which tests are given and which are yet to give
router.post("/checkTestStatus", function(req,res){
    var testStatus = {
        status: "",
        personality: null,
        numerical: null,
        perceptual: null,
        verbal: null,
        abstractApti: null,
        spatial: null
    };

    User.findOne({username:req.body.username},function(err,foundEntry){
        if(err){
            console.log(err);
            res.send(testStatus);
        } else {
            testStatus.status = "Success";

            if(Object.keys(foundEntry.ocean_result).length === 0 ){
                testStatus.personality = false;
            } else{
                testStatus.personality = true;
            }
            if(foundEntry.numerical == null){
                testStatus.numerical = false;
            } else{
                testStatus.numerical = true;
            }
            if(foundEntry.perceptual == null){
                testStatus.perceptual = false;
            } else{
                testStatus.perceptual = true;
            }
            if(foundEntry.verbal == null){
                testStatus.verbal = false;
            } else{
                testStatus.verbal = true;
            }
            if(foundEntry.abstractApti == null){
                testStatus.abstractApti = false;
            } else{
                testStatus.abstractApti = true;
            }
            if(foundEntry.spatial == null){
                testStatus.spatial = false;
            } else{
                testStatus.spatial = true;
            }
            res.send(testStatus);
        }
    });
});


//Get NA Aptitude questions from DB
router.get("/getNAQuestions", function(req,res){

    AptitudeQuestions.find({type: "NA"}, function(err,allNAQuestions){
        if(err){
            console.log(err);
        } else {
            allNAQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allNAQuestions){
                let obj = {
                    id: allNAQuestions[question].id,
                    question: allNAQuestions[question].question,
                    optionA: allNAQuestions[question].optionA,
                    optionB: allNAQuestions[question].optionB,
                    optionC: allNAQuestions[question].optionC,
                    optionD: allNAQuestions[question].optionD,
                    correctOption: allNAQuestions[question].correctOption,
                    type: allNAQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });

});


//Get PA Aptitude questions from DB
router.get("/getPAQuestions", function(req,res){

    AptitudeQuestions.find({type: "PA"}, function(err,allPAQuestions){
        if(err){
            console.log(err);
        } else {
            allPAQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allPAQuestions){
                let obj = {
                    id: allPAQuestions[question].id,
                    question: allPAQuestions[question].question,
                    optionA: allPAQuestions[question].optionA,
                    optionB: allPAQuestions[question].optionB,
                    optionC: allPAQuestions[question].optionC,
                    optionD: allPAQuestions[question].optionD,
                    correctOption: allPAQuestions[question].correctOption,
                    type: allPAQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });

});


//Get VR Aptitude questions from DB
router.get("/getVRQuestions", function(req,res){

    AptitudeQuestions.find({type: "VR"}, function(err,allVRQuestions){
        if(err){
            console.log(err);
        } else {
            allVRQuestions.sort((obj1,obj2)=> obj1.id-obj2.id);

            let UpdateObjectsArray=[];
            for(let question in allVRQuestions){
                let obj = {
                    id: allVRQuestions[question].id,
                    question: allVRQuestions[question].question,
                    optionA: allVRQuestions[question].optionA,
                    optionB: allVRQuestions[question].optionB,
                    optionC: allVRQuestions[question].optionC,
                    optionD: allVRQuestions[question].optionD,
                    correctOption: allVRQuestions[question].correctOption,
                    type: allVRQuestions[question].type
                };
                UpdateObjectsArray.push(obj);
            } 
            res.send(UpdateObjectsArray);
        }
    });

});


//Store NA result in DB
router.post("/storeNAresult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {numerical: req.body.numerical}, function(err,updatedEntry){
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


//Store PA result in DB
router.post("/storePAresult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {perceptual: req.body.perceptual}, function(err,updatedEntry){
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


//Store VR result in DB
router.post("/storeVRresult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {verbal: req.body.verbal}, function(err,updatedEntry){
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


//Store AR result in DB
router.post("/storeARresult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {abstractApti: req.body.abstractApti}, function(err,updatedEntry){
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


//Store SA result in DB
router.post("/storeSAresult", function(req,res){
    var status = {
        status:"",
        username: req.body.username,
        id:""
    };

    User.findOneAndUpdate({username: req.body.username}, {spatial: req.body.spatial}, function(err,updatedEntry){
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


//Get NA result from DB
router.post("/getNAresult", function(req,res){
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
            if(foundEntry.numerical == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.numerical;
                res.send(status);
            }
        }
    });
});


//Get PA result from DB
router.post("/getPAresult", function(req,res){
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
            if(foundEntry.perceptual == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.perceptual;
                res.send(status);
            }
        }
    });
});


//Get VR result from DB
router.post("/getVRresult", function(req,res){
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
            if(foundEntry.verbal == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.verbal;
                res.send(status);
            }
        }
    });
});


//Get AR result from DB
router.post("/getARresult", function(req,res){
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
            if(foundEntry.abstractApti == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.abstractApti;
                res.send(status);
            }
        }
    });
});


//Get SA result from DB
router.post("/getSAresult", function(req,res){
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
            if(foundEntry.spatial == null){
                //Means user has not given the test
                status.status = "Test Not Given";
                res.send(status);
            } else {
                //User has given the test
                status.status = "Success";
                status.result = foundEntry.spatial;
                res.send(status);
            }
        }
    });
});

module.exports = router;