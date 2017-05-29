(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController',pageNewController);

    function pageNewController($location,$routeParams,pageService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function createPage(page) {
            if(typeof page === 'undefined'){
                model.error = "Cannot create an empty page";
                return;
            }
            if(typeof page.name === 'undefined' || typeof page.description === 'undefined'){
                model.error = "Name and Description can't be empty";
                return;
            }
            pageService.createPage(model.websiteId,page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();