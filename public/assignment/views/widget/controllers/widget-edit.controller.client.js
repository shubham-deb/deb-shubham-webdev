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
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                    model.name = widget.name;
                    model.text = widget.text;
                    model.size = widget.size;
                    model.width = widget.width;
                    model.url = widget.url;
                    model.rows = widget.rows;
                    model.formatted = widget.formatted;
                    model.placeholder = widget.placeholder;
                });

            // model.widgets = widgetService.getAllWidgets();
        }
        init();
        
        function updateWidget(type) {
            var w ={
              pageId:model.pageId,
              name:model.name,
              text:model.text,
              size:model.size,
              width:model.width,
              url:model.url,
              type: type,
              rows:model.rows,
              formatted:model.formatted,
              placeholder:model.placeholder
            };
            if(typeof w === 'undefined' || w === ""){
                model.error = "Cannot create an empty widget";
                return;
            }
            if(type === 'HEADING') {
                if (model.size === "" || model.text === "" ||
                    typeof model.size === 'undefined' || typeof model.text === 'undefined') {
                    model.error = "Size and text can't be empty";
                    return;
                }
            }
            else if(type === 'HTML'){
                if (model.name === "" || model.text === "" ||
                    typeof model.name === 'undefined' || typeof model.text === 'undefined') {
                    model.error = "Name and text can't be empty";
                    return;
                }
            }
            else if(type === 'TEXT'){
                if (model.rows === "" || typeof model.rows === 'undefined') {
                    model.error = "Rows can't be empty";
                    return;
                }
            }
            else if(type === 'IMAGE' || type === 'YOUTUBE') {
                if (model.url === "" || model.width === "" ||
                    typeof model.url === 'undefined' || typeof model.width === 'undefined') {
                    model.error = "Url and width can't be empty";
                    return;
                }
            }
            widgetService
                .updateWidget(model.pageId,model.widgetId,w)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.pageId,model.widgetId)
                .then(function (status) {
                    // console.log(status);
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }
    }
})();