// import express library and instantiate the object
// express library helps us to listen for http requests and responses between the client and the server
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require("./todo/app")(app);

// receives either the port that the heroku uses or default port 3000
var port = process.env.PORT || 3000;

app.listen(port);