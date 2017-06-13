(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController',pageEditController);

    function pageEditController($location,$routeParams,pageService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.delPage = delPage;
        model.updatePage = updatePage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                    model.name  = model.page.name;
                    model.description = model.page.description;
                });
        }
        init();

        function delPage() {
            pageService
                .deletePage(model.userId,model.websiteId,model.pageId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
        
        function updatePage() {
            var page = {
                _id:model.pageId,
                name: model.name,
                websiteId:model.websiteId,
                description: model.description
            };
            if(typeof page === 'undefined' || page === ""){
                model.error = "Cannot create an empty page";
                return;
            }
            if(page.name === "" || page.description === ""){
                model.error = "Name and Description can't be empty";
                return;
            }
            pageService
                .updatePage(model.pageId,page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();