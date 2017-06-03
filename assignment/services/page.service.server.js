var app = require('../../express');

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];


app.post("/api/website/:websiteId/page",createpage);
app.put("/api/page/:pageId",updatepage);
app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
app.get("/api/page/:pageId",findPageById);
app.delete("/api/page/:pageId",deletepage);

function findAllPagesForWebsite(req,res) {
    var results = [];
    var websiteId = req.params.websiteId;
    for(var p in pages){
        page = pages[p];
        if(page.websiteId === websiteId) {
            results.push(page);
        }
    }
    res.json(results);
}

function findPageById(req,res) {
    var pid = req.params.pageId;
    for(var p in pages){
        page = pages[p];
        if(page._id === pid) {
            res.send(page);
            return;
        }
    }
    res.sendStatus(404);
}

function createpage(req,res) {
    var page = req.body;
    page._id = (new Date()).getTime()+"";
    pages.push(page);
    res.send(page);
}

function updatepage(req,res) {
    var page = req.body;
    for(var p in pages){
        if(pages[p]._id === req.params.pageId) {
            pages[p]=page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletepage(req,res) {
    for(var p in pages){
        if(pages[p]._id === req.params.pageId) {
            pages.splice(p,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}