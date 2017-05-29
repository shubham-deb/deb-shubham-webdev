/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .factory('websiteService',websiteService);

    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            findWebsitesByUser:findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            deleteWebsite:deleteWebsite,
            createWebsite:createWebsite,
            updateWebsite:updateWebsite
        };
        // returns the object that could be used by other controllers to modify data.
        return api;


        function findWebsitesByUser(userId) {
            var results = [];
            for(var w in websites){
                var website = websites[w];
                if(website.developerId === userId){
                    results.push(website);
                }
            }
            return results;
        }
        
        function findWebsiteById(websiteId) {
            return retreivedWebsite =  websites.find(function (website) {
                return website._id === websiteId;
            });
        }
        
        function deleteWebsite(websiteId) {
            var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index,1);
        }

        function createWebsite(website) {
            website._id = (new Date()).getTime()+"";
            websites.push(website);
            return website;
        }
        
        function updateWebsite(websiteId,website) {
            var retreiveWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(retreiveWebsite);
            retreiveWebsite.name = website.name;
            retreiveWebsite.description = website.description;
            websites[index] = retreiveWebsite;
        }
    }
})();