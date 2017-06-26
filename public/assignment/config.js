/**
 * Created by debsh on 23-05-2017.
 */
// happens on a file that already exists
(function () {
    angular
        .module('WebAppMaker')
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl : 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/login',{
                templateUrl : 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register',{
                templateUrl : 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile',{
                templateUrl : 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website',{
                templateUrl : 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/new',{
                templateUrl : 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:websiteId',{
                templateUrl : 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:websiteId/page',{
                templateUrl : 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/new',{
                templateUrl : 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId',{
                templateUrl : 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget',{
                templateUrl : 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/new',{
                templateUrl : 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'widgetChooserController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId',{
                templateUrl : 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId/search',{
                templateUrl : 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            });
    }
    function checkLoggedIn($q,userService,$location) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (response) {
                if(response === '0'){
                    deferred.reject();
                    $location.url('/login');
                }else{
                    deferred.resolve(response);
                }
            });
        return deferred.promise;
    }
})();