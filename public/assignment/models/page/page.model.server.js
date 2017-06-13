var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel',pageSchema);
var websiteModel = require('../website/website.modal.server');

// pageModel.updateWidget = updateWidget;
// pageModel.getAllWidgets = getAllWidgets;
// pageModel.reorderWidgets = reorderWidgets;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findAllPages = findAllPages;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

// function getAllWidgets(pageId) {
//     return pageModel
//         .findPageById(pageId)
//         .then(function (page) {
//           return page.widgets;
//         })
// }

// function updateWidget(pageId,widgetId,newWidget) {
//     return pageModel
//         .findById(pageId)
//         .then(function (page) {
//             console.log(page.widgets);
//             var index = page.widgets.indexOf(widgetId);
//             console.log("Index is "+index);
//             page.widgets.splice(index,1);
//             page.widgets.concat(newWidget);
//             console.log("UPDATED : "+page.widgets);
//             return page.save();
//         })
// }

// function reorderWidgets(pageId,start,end) {
//     return pageModel
//             .findPageById(pageId)
//             .then(function (page) {
//                 page.widgets.splice(end,0,page.widgets.splice(start,1));
//                 page.markModified('widgets');
//                 return page.save();
//     });
// }


function addWidget(pageId, widget) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            // console.log(widget);
            page.widgets.push(widget);
            return page.save();
        });
}

function deleteWidget(pageId,widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();
        });
}

function createPage(page) {
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(page._website, page._id);
        });
}

function findPageById(pageId) {
    return pageModel.findById({_id:pageId});

}

function findAllPages(websiteId) {
    return pageModel.find({_website:websiteId});
}

function updatePage(pageId,newpage) {
    //to disallow certain fields from getting updated, delete the fields
    return pageModel.update({_id:pageId},{$set:newpage});
}

function deletePage(websiteId,pageId) {
    return pageModel
        .remove({_id:pageId})
        .then(function (status) {
            return websiteModel
                    .deletePage(websiteId,pageId);
        });
}