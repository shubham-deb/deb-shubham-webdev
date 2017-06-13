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
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;
                    model.name = model.website.name;
                    model.description = model.website.description;
                });
        }
        init();
        
        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(model.userId,websiteId)
                .then(function (res) {
                    $location.url('/user/'+model.userId+'/website');
                },function (err) {
                    console.log("ERROR"+err);
                });
        }
        
        function updateWebsite() {

            var updatedWebsite = {
              _id:model.websiteId,
              name:model.name,
              developerId:model.website.developerId,
              description:model.description
            };
            if(typeof model.website === 'undefined' || model.website === ""){
                model.error = "Cannot create an empty website";
                return;
            }
            if(model.name === "" || model.description === ""){
                model.error = "Name and Description can't be empty";
                return;
            }
            websiteService
                .updateWebsite(model.websiteId,updatedWebsite)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();