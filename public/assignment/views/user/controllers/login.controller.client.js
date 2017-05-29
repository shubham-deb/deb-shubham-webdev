/**
 * Created by debsh on 23-05-2017.
 */
// creating an immediately invoked javascript expression
(function () {
    angular
        .module("WebAppMaker")
        .controller('loginController',loginController); 
    
    function loginController($location,userService) {
        // refers to the instance of the called controller
        var model = this;

        model.login = login;

        function login(username,password) {
            var found = userService.findUserByCredentials(username,password);

            if(found!=null) {
                $location.url('/user/'+user._id);
                // model.message = "Welcome " + username;
            }
            else
                model.message = "Sorry, username and password not found";
        }
    }
})();