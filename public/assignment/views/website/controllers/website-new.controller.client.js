(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController',websiteNewController);

    function websiteNewController($location,$routeParams,websiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(website) {
            if(typeof website === 'undefined' || website === ''){
                model.error = "Cannot create an empty website";
                return;
            }
            if(typeof website.name === 'undefined' || typeof website.description === 'undefined'
                || website.name === '' || website.description === ''){
                model.error = "Name and Description can't be empty";
                return;
            }
            website.developerId = model.userId;
            websiteService
                .createWebsite(website)
                .then(function () {
                    $location.url('/user/'+model.userId+ '/website');
                });
        }
    }
})();