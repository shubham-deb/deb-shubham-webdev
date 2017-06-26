var app = require('../../express');
var websiteModel = require('../../public/assignment/models/website/website.modal.server');

app.post("/api/user/:userId/website",createwebsite);
app.put("/api/website/:websiteId",updatewebsite);
app.get("/api/website/:websiteId",findAllwebsites);
app.get("/api/user/:userId/website",findWebsitesByUser);
app.delete("/api/assignment/user/:userId/website/:websiteId",deletewebsite);

function findWebsitesByUser(req,res) {
    var userId  = req.params.userId;
    websiteModel
        .findWebsiteById(userId)
        .then(function (website) {
           res.json(website);
           res.sendStatus(200);
        },function (err) {
            console.log(err);
            res.sendStatus(404);
        });
}

function findAllwebsites(req,res) {
    var wid = req.params.websiteId;
    websiteModel
        .findAllWebsites(wid)
        .then(function (websites) {
            res.send(websites);
        },function (err) {
            console.log(err);
            res.sendStatus(404);
        });
}

function createwebsite(req,res) {
    var website = req.body;
    var userId  = req.params.userId;
    website._user = userId;
    websiteModel
        .createWebsite(website)
        .then(function (website) {
            res.json(website);
            res.sendStatus(200);
        },function (err) {
            console.log(err);
            res.sendStatus(404);
        });
}

function updatewebsite(req,res) {
    var web = req.body;
    var websiteId = req.params.websiteId;
    websiteModel
        .updateWebsite(websiteId,web)
        .then(function (website) {
            res.send(website);
        },function (err) {
            console.log(err);
            res.sendStatus(404);
        });
}

function deletewebsite(req,res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsite(userId,websiteId)
        .then(function (status) {
           res.send(status);
        },function (err) {
            console.log(err);
            res.sendStatus(404);
        });
}