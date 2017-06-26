(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController',websiteNewController);

    function websiteNewController(currentUser,$location,$routeParams,websiteService) {
        var model = this;
        model.userId = currentUser._id;
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
            // if(typeof model.name === 'undefined' || typeof  model.description === 'undefined'
            //     ||  model.name === '' ||  model.description === ''){
            //     model.error = "Name and Description can't be empty";
            //     return;
            // }
            if(model.name === undefined){
                model.webname = "Name is required";
                model.error = true;
                return;
            }
            model.webname = false;
            model.error = false;

            var website = {
                name:model.name,
                description:model.description
            };
            website.developerId = model.userId;
            websiteService
                .createWebsite(website)
                .then(function () {
                    $location.url('/website');
                });
        }
    }
})();