(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController(currentUser,$location,$routeParams,widgetService) {
        var model = this;
        model.userId = currentUser._id;
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
            if(typeof w === 'undefined' || w === undefined){
                model.error = true;
                return;
            }
            if(type === 'HEADING') {
                if (model.size === undefined || model.text === undefined || model.name === undefined) {
                    if (model.name === undefined) {
                        model.widgetename = "name is required";
                        model.error = true;
                    }
                    else{
                        model.widgetename = false;
                    }
                    if ( model.text === undefined) {
                        model.widgettext = "Password is required";
                        model.error = true;
                    }
                    else{
                        model.widgettext = false;
                    }
                    if (model.size === undefined) {
                        model.widgetsize = "Password is required";
                        model.error = true;
                    }
                    else{
                        model.widgetsize = false;
                    }
                    return;
                }
                model.widgetename = false;
                model.widgetsize = false;
                model.widgettext = false;
            }
            else if(type === 'HTML'){
                if (model.name === undefined) {
                    model.widgetename = "name is required";
                    model.error = true;
                    return;
                }
                model.widgetename = false;
            }
            else if(type === 'TEXT'){
                if (model.rows === undefined || model.name === undefined) {
                    if (model.name === undefined) {
                        model.widgetname = "name is required";
                        model.error = true;
                    }
                    else {
                        model.widgetname = false;
                    }
                    if (model.rows === undefined) {
                        model.widgetrows = "rows is required";
                        model.error = true;
                    }
                    else {
                        model.widgetrows = false;
                    }
                    return;
                }
                model.widgetname = false;
                model.widgetrows = false;
                model.error = true;
            }
            else if(type === 'IMAGE' || type === 'YOUTUBE') {
                if (model.url === undefined || model.width === undefined || model.name === undefined) {
                    if (model.url === undefined) {
                        model.widgeturl = "name is required";
                        model.error = true;
                    }
                    else {
                        model.widgeturl = false;
                    }
                    if (model.width === undefined) {
                        model.widgetwidth = "width is required";
                        model.error = true;
                    }
                    else {
                        model.widgetwidth = false;
                    }
                    if (model.name === undefined) {
                        model.widgetname = "name is required";
                        model.error = true;
                    }
                    else {
                        model.widgetname = false;
                    }
                    return;
                }
                model.widgetname = false;
                model.widgetwidth = false;
                model.widgeturl = false;
            }
            widgetService
                .updateWidget(model.pageId,model.widgetId,w)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.pageId,model.widgetId)
                .then(function (status) {
                    // console.log(status);
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }
    }
})();