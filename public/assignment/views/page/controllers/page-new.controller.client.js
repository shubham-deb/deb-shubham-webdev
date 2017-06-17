(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController',pageNewController);

    function pageNewController(currentUser,$location,$routeParams,pageService) {
        var model = this;
        model.userId = currentUser._id;
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

        function createPage() {
            // if(typeof model.name === 'undefined' || typeof model.description === 'undefined'
            //     || model.name === "" || model.description === ""){
            //     model.error = "Name and Description can't be empty";
            //     return;
            // }
            if(model.pagename === undefined){
                model.pagename = "Name is required";
                model.error = true;
                return;
            }
            model.pagename = false;
            model.error = false;

            var page  = {
                websiteId: model.websiteId,
                name: model.name,
                description: model.description
            };
            pageService
                .createPage(model.websiteId,page)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page');
                });
        }
    }
})();