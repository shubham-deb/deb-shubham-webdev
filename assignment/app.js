var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

//var connectionString = 'mongodb://localhost/myDb';
var connectionString = 'mongodb://shubhamdeb:shubhamdeb_123@ds111791.mlab.com:11791/heroku_dpwjbc7x';
mongoose.connect(connectionString);

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');