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
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
            model.name  = model.page.name;
            model.description = model.page.description;
        }
        init();

        function delPage() {
            pageService.deletePage(model.pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
        
        function updatePage() {
            var page = {
                name: model.name,
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
            pageService.updatePage(model.pageId,page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();