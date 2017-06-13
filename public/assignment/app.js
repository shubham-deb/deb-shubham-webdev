/**
 * Created by debsh on 23-05-2017.
 */
(function () {
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

    angular
        .module('WebAppMaker',['ngRoute','wbdvDirectives','textAngular']);
})();