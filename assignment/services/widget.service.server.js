var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.put("/api/page/:pageId/widget?initial=index1&final=index2",orderWidgets);
app.post ("/api/assignment/uploads", upload.single('myFile'), uploadImage);
app.post("/api/page/:pageId/widget",createwidget);
app.put("/api/widget/:widgetId",updatewidget);
app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
app.get("/api/widget/:widgetId",findWidgetById);
app.delete("/api/widget/:widgetId",deletewidget);

function orderWidgets(req,res) {
    var oldIndex = parseInt(req.query.initial);
    var newIndex = parseInt(req.query.final);
    var pageId = req.params.pageId;

    var wids = [];
    for(var w in widgets){
        if(widgets[w].pageId === pageId)
            wids.push(widgets[w]);
    }

    if(wids === [])
        res.sendStatus(304);
    else{
        var temp = wids[oldIndex];
        wids[oldIndex] = wids[newIndex];
        wids[newIndex] = temp;
        console.log(wids);
        res.sendStatus(200);
    }
}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;

    for(var w in widgets){
        wid = widgets[w];
        if(wid._id === widgetId) {
            widget = wid;
            break;
        }
    }
    var width = req.body.width;
    var myFile = req.file;
    var pageId = widget.pageId;
    var userId = widget.userId;
    var websiteId = widget.websiteId;

    console.log(myFile);
    if(typeof myFile === 'undefined' || myFile === "") {
        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
        res.redirect(callbackUrl);
    }
    else {
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        widget.url = '/assignment/uploads/' + filename;
        widget.width = width;
        callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
        res.redirect(callbackUrl);
    }
}

function findAllWidgetsForPage(req,res) {
    var results = [];
    var pageId = req.params.pageId;
    for(var w in widgets){
        widget = widgets[w];
        if(widget.pageId === pageId) {
            results.push(widget);
        }
    }
    res.json(results);
}

function findWidgetById(req,res) {
    var wid = req.params.widgetId;
    for(var w in widgets){
        widget = widgets[w];
        if(widget._id === wid) {
            res.send(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function createwidget(req,res) {
    var widget = req.body;
    widget._id = (new Date()).getTime()+"";
    widget.pageId = req.params.pageId;
    widgets.push(widget);
    res.json(widget);
}

function updatewidget(req,res) {
    var widget = req.body;
    for(var w in widgets){
        if(widgets[w]._id === req.params.widgetId) {
            widgets[w]=widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletewidget(req,res) {
    for(var w in widgets){
        if(widgets[w]._id === req.params.widgetId) {
            widgets.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}