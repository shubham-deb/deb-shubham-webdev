/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .factory('widgetService',widgetService);

    function widgetService($http) {

        var api = {
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            createWidget:createWidget,
            updateWidget:updateWidget,
            getAllWidgets:getAllWidgets,
            deleteWidget:deleteWidget,
            orderWidgets:orderWidgets
        };
        // returns the object that could be used by other controllers to modify data.
        return api;


        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http
                    .get(url)
                    .then(function (response) {
                        return response.data;
                    })
            // var results = [];
            // for(var w in widgets){
            //     var widget = widgets[w];
            //     if(widget.pageId === pageId){
            //         results.push(widget);
            //     }
            // }
            // return results;
        }
        
        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
            // return retreivedWidget = widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });
        }

        function createWidget(pageId,widget) {
            var url = "/api/page/"+pageId+"/widget";
            return $http
                .post(url,widget)
                .then(function (response) {
                    return response.data;
                })
            // widget._id = (new Date()).getTime()+"";
            // widget.pageId = pageId;
            // widgets.push(widget);
            // return widget;
        }

        function updateWidget(widgetId,widget) {
            var url = "/api/widget/"+widgetId;
            return $http
                .put(url,widget)
                .then(function (response) {
                    return response.data;
                })
            // var retreivewidget = findWidgetById(widgetId);
            // var index = widgets.indexOf(retreivewidget);
            //
            // if(widget.widgetType === "HEADING" || widget.widgetType === "HTML") {
            //     retreivewidget.name = widget.name;
            //     retreivewidget.text = widget.text;
            //     retreivewidget.size = widget.size;
            //     widgets[index] = retreivewidget;
            // }
            // else if (widget.widgetType === "IMAGE"){
            //     retreivewidget.name = widget.name;
            //     retreivewidget.url = widget.url;
            //     retreivewidget.text = widget.text;
            //     retreivewidget.width = widget.width;
            //     widgets[index] = retreivewidget;
            // }
            // else if (widget.widgetType === "YOUTUBE"){
            //     retreivewidget.name = widget.name;
            //     retreivewidget.url = widget.url;
            //     retreivewidget.text = widget.text;
            //     retreivewidget.width = widget.width;
            //     widgets[index] = retreivewidget;
            // }
        }
        function getAllWidgets() {
            return widgets;
        }
        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                })
            // var widget = findWidgetById(widgetId);
            // var index = widgets.indexOf(widget);
            // widgets.splice(index,1);
        }
        
        function orderWidgets(url) {

            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();