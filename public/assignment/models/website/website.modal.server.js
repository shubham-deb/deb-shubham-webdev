var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel',websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.deletePage = deletePage;
websiteModel.addPage = addPage;
websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        },function (err) {
            console.log(err);
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function createWebsite(website) {
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(website._user, website._id);
        });
}

function findWebsiteById(userId) {
    return websiteModel.find({_user:userId});
}

function findAllWebsites(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId,newwebsite) {
    //to disallow certain fields from getting updated, delete the fields
    return websiteModel.update({_id:websiteId},{$set:newwebsite});
}

function deleteWebsite(userId,websiteId) {
    return websiteModel
        .remove({_id:websiteId})
        .then(function (ststus) {
            return userModel
                .deleteWebsite(userId,websiteId);
        });
}