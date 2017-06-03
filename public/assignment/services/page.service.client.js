/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .factory('pageService',pageService);

    function pageService($http) {

        var api = {
            findPageByWebsiteId:findPageByWebsiteId,
            createPage:createPage,
            findPageById:findPageById,
            deletePage:deletePage,
            updatePage:updatePage
        };
        // returns the object that could be used by other controllers to modify data.
        return api;


        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http
                    .get(url)
                    . then(function (response) {
                        return response.data;
                    })
            // var results = [];
            // for(var p in pages){
            //     var page = pages[p];
            //     if(page.websiteId === websiteId){
            //         results.push(page);
            //     }
            // }
            // return results;
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http
                .get(url)
                . then(function (response) {
                    return response.data;
                })
            // return retreivedPage =  pages.find(function (page) {
            //     return page._id === pageId;
            // });
        }

        function deletePage(pageId) {
            var url="/api/page/"+pageId;
            return $http
                .delete(url)
                . then(function (response) {
                    return response.data;
                })
            // var page = findPageById(pageId);
            // var index = pages.indexOf(page);
            // pages.splice(index,1);
        }

        function createPage(websiteId,page) {
            var url = "/api/website/"+websiteId+"/page";
            return $http
                .post(url,page)
                . then(function (response) {
                    return response.data;
                })
            // page.websiteId = websiteId;
            // page._id = (new Date()).getTime()+"";
            // pages.push(page);
            // return page;
        }

        function updatePage(pageId,page) {
            var url = "/api/page/"+pageId;
            return $http
                .put(url,page)
                . then(function (response) {
                    return response.data;
                })
            // var retreivePage = findPageById(pageId);
            // var index = pages.indexOf(retreivePage);
            // retreivePage.name = page.name;
            // retreivePage.description = page.description;
            // pages[index] = retreivePage;
        }
    }
})();
