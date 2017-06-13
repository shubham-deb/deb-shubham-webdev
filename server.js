// import express library and instantiate the object
// express library helps us to listen for http requests and responses between the client and the server
var app = require('./express');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');

app.use(app.express.static(__dirname + '/public'));
require('./assignment/app');
// require('./public/mongo/app');

app.listen(process.env.PORT || 3000);