/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .factory('pageService',pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

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
            var results = [];
            for(var p in pages){
                var page = pages[p];
                if(page.websiteId === websiteId){
                    results.push(page);
                }
            }
            return results;
        }

        function findPageById(pageId) {
            return retreivedPage =  pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index,1);
        }

        function createPage(websiteId,page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime()+"";
            pages.push(page);
            return page;
        }

        function updatePage(pageId,page) {
            var retreivePage = findPageById(pageId);
            var index = pages.indexOf(retreivePage);
            retreivePage.name = page.name;
            retreivePage.description = page.description;
            pages[index] = retreivePage;
        }
    }
})();
