var app = require('../../express');
var pageModel = require('../../public/assignment/models/page/page.model.server');

app.post("/api/website/:websiteId/page",createpage);
app.put("/api/page/:pageId",updatepage);
app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
app.get("/api/page/:pageId",findPageById);
app.delete("/api/assignment/user/:userId/website/:websiteId/page/:pageId",deletepage);

function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId;
    pageModel
        .findAllPages(websiteId)
        .then(function (pages) {
            res.send(pages);
            res.sendStatus(200);
        },function (err) {
            res.send(404);
        });
}

function findPageById(req,res) {
    var pid = req.params.pageId;
    pageModel
        .findPageById(pid)
        .then(function (page) {
            res.send(page);
        },function (response) {
            res.send(404);
        })
}

function createpage(req,res) {
    var page = req.body;
    page._website = req.params.websiteId;
    pageModel
        .createPage(page)
        .then(function (page) {
            res.send(page);
        },function (err) {
            res.send(404);
        })
}

function updatepage(req,res) {
    var page = req.body;
    var pageId = req.params.pageId;
    pageModel
        .updatePage(pageId,page)
        .then(function (page) {
            res.send(page);
        },function (err) {
            res.send(404);
        });
}

function deletepage(req,res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    pageModel
        .deletePage(websiteId,pageId)
        .then(function (status) {
            res.send(status);
        },function (err) {
            res.sendStatus(404);
        });
}