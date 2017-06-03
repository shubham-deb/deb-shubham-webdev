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
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage(page) {
            page.websiteId = model.websiteId;

            if(typeof page === 'undefined' || page === ""){
                model.error = "Cannot create an empty page";
                return;
            }
            if(typeof page.name === 'undefined' || typeof page.description === 'undefined'
                || page.name === "" || page.description === ""){
                model.error = "Name and Description can't be empty";
                return;
            }
            pageService
                .createPage(model.websiteId,page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();