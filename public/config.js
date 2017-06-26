/**
 * Created by debsh on 23-05-2017.
 */
// happens on a file that already exists
(function () {
    angular
        .module('MyHomePageApp')
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl : 'index.html'
            })
            .when('/login',{
                templateUrl : 'assignment/views/user/templates/login.view.client.html',
                controller:'loginController',
                controllerAs:'model'
            });
    }
})();