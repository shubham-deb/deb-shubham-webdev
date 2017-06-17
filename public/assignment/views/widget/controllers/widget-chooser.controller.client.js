(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetChooserController',widgetChooserController);

    function widgetChooserController(currentUser,$location,$routeParams,widgetService) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.createWidget = createWidget;

        function createWidget(type) {
            var widget= {
                type:type
            };
            widgetService
                .createWidget(model.pageId,widget)
                .then(function (widget) {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                },function (err) {
                    console.log(err);
                });
        }

    }
})();