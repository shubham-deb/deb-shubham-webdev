var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

// var connectionString = 'mongodb://localhost/myDb';

if(process.env.MONGODB_URI){
    connectionString = process.env.MONGODB_URI;
}

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds111791.mlab.com:11791/heroku_dpwjbc7x'; // user yours
}
mongoose.connect(connectionString);
// mongoose.connect('mongodb://localhost/myDb');

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');