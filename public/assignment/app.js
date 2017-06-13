/**
 * Created by debsh on 23-05-2017.
 */
(function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
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

    angular
        .module('WebAppMaker',['ngRoute','wbdvDirectives','textAngular']);
})();