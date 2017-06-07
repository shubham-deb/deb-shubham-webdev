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

app.put("/page/:pageId/widget",orderWidget);
app.post ("/api/assignment/uploads", upload.single('myFile'), uploadImage);
app.post("/api/page/:pageId/widget",createwidget);
app.put("/api/widget/:widgetId",updatewidget);
app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
app.get("/api/widget/:widgetId",findWidgetById);
app.delete("/api/widget/:widgetId",deletewidget);

function orderWidget(req,res) {
    var oldIndex = parseInt(req.query.initial);
    var newIndex = parseInt(req.query.final);
    var pageId = req.params.pageId;

    var results = [];
    for(var w in widgets){
        widget = widgets[w];
        if(widget.pageId === pageId) {
            results.push(widget);
            delete widgets[w];
        }
    }

    var temp = results[oldIndex];
    results[oldIndex] = results[newIndex];
    results[newIndex] = temp;
    widgets.splice.apply(widgets,[0,0].concat(results));
    // console.log(widgets);

    res.sendStatus(200);
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
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    // console.log(myFile);
    if(typeof myFile === 'undefined' || myFile === "" || width === "" || typeof width === 'undefined') {
        res.sendStatus(304);
        // var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
        // res.redirect(callbackUrl);
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