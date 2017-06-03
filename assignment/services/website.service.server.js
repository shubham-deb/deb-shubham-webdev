var app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];


app.post("/api/user/:userId/website",createwebsite);
app.put("/api/website/:websiteId",updatewebsite);
app.get("/api/website/:websiteId",findAllwebsites);
app.get("/api/user/:userId/website",findWebsitesByUser);
app.delete("/api/website/:websiteId",deletewebsite);

function findWebsitesByUser(req,res) {
    var results = [];
    var userId = req.params.userId;
    for(var w in websites){
        website = websites[w];
        if(website.developerId === userId) {
            results.push(website);
        }
    }
    res.json(results);
}

function findAllwebsites(req,res) {
    var wid = req.params.websiteId;
    for(var w in websites){
        website = websites[w];
        if(website._id === wid) {
            res.send(website);
            return;
        }
    }
    res.sendStatus(404);
}

function createwebsite(req,res) {
    var website = req.body;
    website._id = (new Date()).getTime()+"";
    websites.push(website);
    res.json(website);
}

function updatewebsite(req,res) {
    var web = req.body;
    for(var w in websites){
        if(websites[w]._id === req.params.websiteId) {
            websites[w]=web;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletewebsite(req,res) {
    for(var w in websites){
        if(websites[w]._id === req.params.websiteId) {
            websites.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}