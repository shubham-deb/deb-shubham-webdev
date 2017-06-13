var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel',userSchema);

userModel.deleteWebsite = deleteWebsite;
userModel.addWebsite = addWebsite;
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findAllUserByUsername = findAllUserByUsername;
userModel.findAllUserByCredentials = findAllUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findAllUserByUsername(username) {
    return userModel.findOne({username:username});
}

function findAllUserByCredentials(username,password) {
    return userModel.findOne({username:username,password:password});
}

function updateUser(userId,newUser) {
    //to disallow certain fields from getting updated, delete the fields
    delete newUser.password;
    delete newUser.username;
    return userModel.update({_id:userId},{$set:newUser});
}

function deleteUser(userId) {
    // console.log("in model server file");
    return userModel.remove({_id:userId});
}