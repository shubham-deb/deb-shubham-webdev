/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .factory('widgetService',widgetService);

    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            findWidgetsByPageId:findWidgetsPageById,
            findWidgetById:findWidgetById,
            createWidget:createWidget,
            updateWidget:updateWidget,
            getAllWidgets:getAllWidgets,
            deleteWidget:deleteWidget
        };
        // returns the object that could be used by other controllers to modify data.
        return api;


        function findWidgetsPageById(pageId) {
            var results = [];
            for(var w in widgets){
                var widget = widgets[w];
                if(widget.pageId === pageId){
                    results.push(widget);
                }
            }
            return results;
        }
        
        function findWidgetById(widgetId) {
            return retreivedWidget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function createWidget(pageId,widget) {
            widget._id = (new Date()).getTime()+"";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function updateWidget(widgetId,widget) {
            var retreivewidget = findWidgetById(widgetId);
            var index = widgets.indexOf(retreivewidget);

            if(widget.widgetType === "HEADING" || widget.widgetType === "HTML") {
                retreivewidget.name = widget.name;
                retreivewidget.text = widget.text;
                retreivewidget.size = widget.size;
                widgets[index] = retreivewidget;
            }
            else if (widget.widgetType === "IMAGE"){
                retreivewidget.name = widget.name;
                retreivewidget.url = widget.url;
                retreivewidget.text = widget.text;
                retreivewidget.width = widget.width;
                widgets[index] = retreivewidget;
            }
            else if (widget.widgetType === "YOUTUBE"){
                retreivewidget.name = widget.name;
                retreivewidget.url = widget.url;
                retreivewidget.text = widget.text;
                retreivewidget.width = widget.width;
                widgets[index] = retreivewidget;
            }
        }
        function getAllWidgets() {
            return widgets;
        }
        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index,1);
        }
    }
})();