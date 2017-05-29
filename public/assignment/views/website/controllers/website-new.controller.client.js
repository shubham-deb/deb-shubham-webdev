(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController',websiteNewController);

    function websiteNewController($location,$routeParams,websiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(website) {
            if(typeof website === 'undefined'){
                model.error = "Cannot create an empty website";
                return;
            }
            if(typeof website.name === 'undefined' || typeof website.description === 'undefined'){
                model.error = "Name and Description can't be empty";
                return;
            }
            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.userId+ '/website');
        }
    }
})();