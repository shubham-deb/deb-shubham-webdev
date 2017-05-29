(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController',websiteEditController);

    function websiteEditController($routeParams,$location,websiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;


        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.name = model.website.name;
            model.description = model.website.description;
        }
        init();
        
        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
        
        function updateWebsite() {
            var website = {
              name: model.name,
              description: model.description
            };
            if(typeof website === 'undefined' || website === ""){
                model.error = "Cannot create an empty website";
                return;
            }
            if(website.name === "" || website.description === ""){
                model.error = "Name and Description can't be empty";
                return;
            }
            websiteService.updateWebsite(model.websiteId,website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();