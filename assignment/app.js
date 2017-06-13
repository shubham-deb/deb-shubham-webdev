var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionString = 'mongodb://localhost/myDb';

if(process.env.MLAB_USERNAME_WEBDEV) {
    var username = process.env.MLAB_USERNAME_WEBDEV;
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds111791.mlab.com:11791/heroku_dpwjbc7x';
}

mongoose.connect(connectionString);
// mongoose.connect('mongodb://localhost/myDb');

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');