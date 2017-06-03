(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetChooserController',widgetChooserController);

    function widgetChooserController($location,$routeParams,widgetService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.createWidget = createWidget;

        function createWidget(type) {
            var widget= {
                widgetType : type
            };
            widgetService
                .createWidget(model.pageId,widget)
                .then(function (widget) {
                    $location.url('/user/'+model.userId+ '/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                });
        }

    }
})();