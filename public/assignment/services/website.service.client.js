/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .factory('websiteService',websiteService);

    function websiteService($http) {

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
            var url = "/api/user/"+userId+"/website";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
            // var results = [];
            // for(var w in websites){
            //     var website = websites[w];
            //     if(website.developerId === userId){
            //         results.push(website);
            //     }
            // }
            // return results;
        }
        
        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http    
                .get(url)
                .then(function (response) {
                    return response.data;
                });
            // return retreivedWebsite =  websites.find(function (website) {
            //     return website._id === websiteId;
            // });
        }
        
        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http
                    .delete(url)
                    .then(function (response) {
                        return response.data;
                    })
            // var website = findWebsiteById(websiteId);
            // var index = websites.indexOf(website);
            // websites.splice(index,1);
        }

        function createWebsite(website) {
            var url = "/api/user/"+website.developerId+"/website";
            return $http
                .post(url,website)
                .then(function (response) {
                    return response.data;
                });
            // website._id = (new Date()).getTime()+"";
            // websites.push(website);
            // return website;
        }
        
        function updateWebsite(websiteId,website) {
            var url = "/api/website/"+websiteId;
            return $http
                    .put(url,website)
                    .then(function (response) {
                        return response.data;
                    })
            // var retreiveWebsite = findWebsiteById(websiteId);
            // var index = websites.indexOf(retreiveWebsite);
            // retreiveWebsite.name = website.name;
            // retreiveWebsite.description = website.description;
            // websites[index] = retreiveWebsite;
        }
    }
})();