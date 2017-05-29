(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController($location,$routeParams,widgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        
        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
            model.name = model.widget.name;
            model.text = model.widget.text;
            model.size = model.widget.size;
            model.width = model.widget.width;
            model.url = model.widget.url;

            // model.widgets = widgetService.getAllWidgets();
        }
        init();
        
        function updateWidget(type) {
            var w ={
              name:model.name,
              text:model.text,
              size:model.size,
              width:model.width,
              url:model.url,
              widgetType: type
            };
            if(typeof w === 'undefined' || w === ""){
                model.error = "Cannot create an empty widget";
                return;
            }
            if(type === 'HEADING' || type === 'HTML') {
                if (w.size === "" || w.text === "") {
                    model.error = "Size and text can't be empty";
                    return;
                }
            }
            else if(type === 'IMAGE' || type === 'YOUTUBE') {
                if (w.url === "" || w.width === "") {
                    model.error = "Url and width can't be empty";
                    return;
                }
            }
            var newW = widgetService.updateWidget(model.widgetId,w);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }
})();