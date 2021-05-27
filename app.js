var express        = require("express");
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var methodOverride = require("method-override");
var app = express();

//Route Setup
var routes = require("./Routes/routes");
var school_routes = require("./Routes/school_routes");
var grad_routes = require("./Routes/grad_routes");


mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err){
    if(err){
        console.log(err);
    } else{
        console.log("Successfully connected to MongoDB");
    }
}); 
// mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Successfully connected to MongoDB");
//     }
// }); 


app.use(bodyParser.json());
app.use(methodOverride("_method"));

//Routes
app.use(routes);
app.use(school_routes);
app.use(grad_routes);


app.listen(process.env.PORT, function(){
    console.log("Server has started!");
});
// app.listen(5000, function () {
//     console.log("Server has started!");
// });

