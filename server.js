// import express library and instantiate the object
// express library helps us to listen for http requests and responses between the client and the server
var app = require('./express');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
require('dotenv').config();

app.use(cookieParser());
app.use(session({
    secret: 'this is the secret'
}));
console.log(process.env.SESSION_SECRET);
app.use(passport.initialize());
app.use(passport.session());

// app.get('/api/session',function (req,res) {
//     // adds session object for each user
//     console.log(req.session);
//     res.send('hello from session');
// });

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');

app.use(app.express.static(__dirname + '/public'));
require('./assignment/app');
// require('./public/mongo/app');

app.listen(process.env.PORT || 3000);