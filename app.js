var express        = require("express");
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var methodOverride = require("method-override");
var app = express();

//Route Setup
var routes = require("./routes/routes.js");
var school_routes = require("./routes/school_routes.js");
var grad_routes = require("./routes/grad_routes.js");

mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err){
    if(err){
        console.log(err);
    } else{
        console.log("Successfully connected to MongoDB");
    }
}); 

app.use(bodyParser.json());
app.use(methodOverride("_method"));

//Routes
app.use(routes);
app.use(school_routes);
app.use(grad_routes);

app.listen(process.env.PORT, function(){
    console.log("Server has started!");
});