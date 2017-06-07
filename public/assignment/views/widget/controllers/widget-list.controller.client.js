(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController',widgetListController);
    
    function widgetListController($location,$routeParams,widgetService,$sce) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.trust = trust;
        model.getEmbedURL = getEmbedURL;

        // $(".widget-list").sortable({
        //     distance:20,
        //     cursor: "move",
        //     axis:"y"
        // });

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            //model.widgets = widgets;
        }
        init();
        
        function trust(html) {
            return $sce.trustAsHtml(html);
        }
        function getEmbedURL(embedURL) {
            //var embedURL = "https://youtu.be/AM2Ivdi9c4E";
            var urlParts = embedURL.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();