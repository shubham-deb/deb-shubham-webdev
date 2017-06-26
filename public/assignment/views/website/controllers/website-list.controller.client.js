(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController',websiteListController);
    
    function websiteListController($routeParams,currentUser,websiteService) {
        var model = this;
        model.userId = currentUser._id;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();
    }
})();