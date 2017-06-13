var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

// mongoose.connect('mongodb://localhost/myDb');

var connectionString = 'mongodb://localhost/myDb';

if(process.env.MONGODB_URI){
    connectionString = process.env.MONGODB_URI;
}

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

mongoose.connect(connectionString);

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');