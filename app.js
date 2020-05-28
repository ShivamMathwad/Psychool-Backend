var express        = require("express");
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var methodOverride = require("method-override");
var app = express();

//Route Setup
var routes = require("./routes.js");

mongoose.connect("mongodb+srv://shivammad:shivam25@cluster0-5zsao.mongodb.net/psychool?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err){
    if(err){
        console.log(err);
    } else{
        console.log("Successfully connected to MongoDB");
    }
}); 

app.use(bodyParser.urlencoded({extended:true}) );
app.use(methodOverride("_method"));

//Routes
app.use(routes);

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}
app.listen(port, function(){
    console.log("Server has started!");
});