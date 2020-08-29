var express = require('express');

var todoController = require('./controllers/task');

//setup our app using express
var app=express();

//set up template engine
app.set('view engine','ejs');

//for accessing static file we use this middleware for every route we will not make it route specific
app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to port
app.listen(3000);
console.log("you are listening to port 3000"); 