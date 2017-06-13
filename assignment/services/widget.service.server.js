var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var widgetModel = require('../../public/assignment/models/widget/widget.model.server');

app.put("/page/:pageId/widget",orderWidget);
app.post ("/api/assignment/uploads", upload.single('myFile'), uploadImage);
app.post("/api/page/:pageId/widget",createwidget);
app.put("/api/page/:pageId/widget/:widgetId",updatewidget);
app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
app.get("/api/widget/:widgetId",findWidgetById);
app.delete("/api/page/:pageId/widget/:widgetId",deletewidget);

function orderWidget(req,res) {
    var oldIndex = parseInt(req.query.initial);
    var newIndex = parseInt(req.query.final);
    var pageId = req.params.pageId;

    // var results = [];
    // for(var w in widgets){
    //     widget = widgets[w];
    //     if(widget.pageId === pageId) {
    //         results.push(widget);
    //         delete widgets[w];
    //     }
    // }

    widgetModel
        .reorderWidget(pageId,oldIndex,newIndex)
        .then(function (status) {
            res.send(status);
        });

    // var temp = results[oldIndex];
    // results[oldIndex] = results[newIndex];
    // results[newIndex] = temp;
    // widgets.splice.apply(widgets,[0,0].concat(results));
    // // console.log(widgets);
    //
    // res.sendStatus(200);
}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if(typeof myFile === 'undefined' || myFile === "" || width === "" || typeof width === 'undefined')
        res.sendStatus(304);
    else {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
        }
    // for(var w in widgets){
    //     wid = widgets[w];
    //     if(wid._id === widgetId) {
    //         widget = wid;
    //         break;
    //     }
    // }
    widgetModel
        .findWidgetById(widgetId)
        .then(function (wid) {
            // console.log(myFile);
                // var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
                // res.redirect(callbackUrl);
            wid.url = '/assignment/uploads/' + filename;
            wid.width = width;
            wid.save();
            callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
            res.redirect(callbackUrl);
        });
}

function findAllWidgetsForPage(req,res) {
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.send(widgets);
        },function (err) {
            res.sendStatus(404);
        });
}

function findWidgetById(req,res) {
    var wid = req.params.widgetId;
    widgetModel
        .findWidgetById(wid)
        .then(function (widget) {
            var w = widget;
            res.send(widget);
        },function (err) {
            res.sendStatus(404);
        })
}

function createwidget(req,res) {
    var widget = req.body;
    widget._page = req.params.pageId;
    widgetModel
        .createWidget(widget)
        .then(function (widget) {
            res.json(widget);
        },function (err) {
            res.sendStatus(404);
        })
}

function updatewidget(req,res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;
    widgetModel
        .updateWidget(pageId,widgetId,widget)
        .then(function (widget) {
            res.send(widget);
        },function (err) {
            res.send(err);
        });
}

function deletewidget(req,res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;
    widgetModel
        .deleteWidget(pageId,widgetId)
        .then(function (status) {
            res.send(status);
        },function (err) {
            res.sendStatus(404);
        })
}