var mongoose = require('mongoose');
var widgetSchema = require('../widget/widget.schema.server');
var widgetModel = mongoose.model("WidgetModel",widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.findAllWidgets = findAllWidgets;

module.exports = widgetModel;

// function createWidget(widget) {
//     return widgetModel
//         .create(widget)
//         .then(function (widget) {
//             return pageModel
//                 .addWidget(widget._page, widget._id);
//         });
// }
function createWidget(pageid,widget) {
    widget._page = pageid;
    return pageModel
        .findById(pageid)
        .then(function (page) {
            var count = page.widgets.length;
            widget.position=count;
            return widgetModel
                .create(widget)
                .then(function (widget) {
                    pageModel.addWidget(pageid, widget._id);
                    return widget; // returning the newly created widget,
                                   // but calling pageModel.addWidget first.
                });
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function findAllWidgetsForPage(pageId) {
    // return pageModel
    //     .getAllWidgets(pageId)
    //     .then(function (page) {
    //         return page;
    //     });
    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}

function updateWidget(widgetId,newWidget) {
    // var widget = widgetModel.findById(widgetId);
    // //to disallow certain fields from getting updated, delete the fields
    // return widgetModel
    //     .update({_id:widgetId},{$set:newWidget})
    //     .then(function (newWid) {
    //         // console.log("PAGE "+page);
    //         pageModel.updateWidget(pageId,widget,newWid);
    //         return newWid;
    //                 });
    return widgetModel
        .update({_id:widgetId},{$set:newWidget});
}

function deleteWidget(pageId,widgetId) {
    return widgetModel
        .remove({_id:widgetId})
        .then(function (status) {
            pageModel
                .deleteWidget(pageId,widgetId);
            return status;
        });
}

function reorderWidget(pageId,start,end) {
    return widgetModel
        .find({_page: pageId}, function (err, docs) {
            widgets = docs.map(function (d) { return d.toObject() });

            var widget = widgets[start];
            widgets.splice(start, 1);
            widgets.splice(end, 0, widget);


            for (var i=0; i<widgets.length;i++) {
                widgets[i].order = i;
            }

            return widgetModel.remove({_page: pageId}, function(err, docs) {

                return widgetModel.create(widgets, function (err, docs) { return docs; });
            });
        })
        .sort({'order': 1})
        .exec(function(err, docs) { return docs; });
    // return widgetModel.find({_page:pageId})
    //     .then(function (widgets) {
    //         return widgetModel
    //             .findOne({position:start})
    //             .then(
    //                 function (widget) {
    //                     var widgetId=widget._id;
    //                     if(end<start){              // widget moved up
    //                         for(var i in widgets){
    //                             // var wid = widgets[i];
    //                             if(widgets[i].position<start && widgets[i].position>=end){
    //                                 widgets[i].position+=1;
    //                                 widgets[i].save();
    //                             }
    //                         }
    //                     }
    //                     else if(end>start){              // widget moved up
    //                         for(var i in widgets){
    //                             // var wid = widgets[i];
    //                             if(widgets[i].position>start && widgets[i].position<=end){
    //                                 widgets[i].position-=1;
    //                                 widgets[i].save();
    //                             }
    //                         }
    //                     }
    //                     widget.position=end;
    //                     widget.save();
    //                     return widgets;
    //                 });
    //     })
}

// .then(function (page) {
//     return widgetModel
//         .findAllWidgetsForPage(pageId)
//         .then(function (widgets) {
//            return widgets.save();
//         })
// });
// .findAllWidgetsForPage(pageId)
// .then(function (page) {
//     page.widgets.splice(end,0,page.widgets.splice(start,1));
//     page.markModified('widgets');
//     return page.save();
// });
// return pageModel
//     .findPageById(pageId)
//     .then(function (page) {
//
//         for(var i=start;i<end;i++){
//             var temp = page.widgets[i];
//             page.widgets[i] = page.widgets[i+1];
//             page.widgets[i+1] = temp;
//         }
//
//         for(var j=end;j>start;j--){
//             var temp2 = page.widgets[i];
//             page.widgets[j] = page.widgets[j-1];
//             page.widgets[j-1] = temp2;
//         }
//         //
//         // for(w in page.widgets)
//         //     console.log("PAGE :"+page.widgets[w]);
//
//         pageModel
//             .update({_id:pageId},{$set:{widgets:page.widgets}})
//             .then(function (res) {
//                 return res;
//             },function (err) {
//                 return err;
//             });
//     },function (err) {
//         console.log("THE ERROR IS "+ err);
//     });
function findAllWidgets() {
    return widgetModel.find();
}