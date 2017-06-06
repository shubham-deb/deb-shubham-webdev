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

        function createWebsite() {
            if(typeof model.name === 'undefined' || typeof  model.description === 'undefined'
                ||  model.name === '' ||  model.description === ''){
                model.error = "Name and Description can't be empty";
                return;
            }
            var website = {
                name:model.name,
                description:model.description
            };
            website.developerId = model.userId;
            websiteService
                .createWebsite(website)
                .then(function () {
                    $location.url('/user/'+model.userId+ '/website');
                });
        }
    }
})();