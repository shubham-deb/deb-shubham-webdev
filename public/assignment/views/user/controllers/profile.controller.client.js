/**
 * Created by debsh on 23-05-2017.
 */
// creating an immediately invoked javascript expression
(function () {
    angular
        .module("WebAppMaker")
        .controller('profileController',profileController);

    function profileController($location,$routeParams,userService) {
        // refers to the instance of the called controller
        var model = this;
        model.userId = $routeParams.userId;
        model.deleteProfile = deleteProfile;
        model.updateProfile = updateProfile;

        function init() {
            model.user = userService.findUserById(model.userId);
            model.username = model.user.username;
            model.firstName = model.user.lastName;
            model.email = model.user.email;
            model.lastName = model.user.lastName;
            // model.users = userService.findUsers();
        }
        init();

        function deleteProfile() {
            userService.deleteUser(model.userId);
            $location.url('/login');
        }

        function updateProfile() {
            var user = {
              username: model.username,
              firstName: model.firstName,
              lastName: model.lastName,
              email: model.email
            };
            userService.updateUser(model.userId,user);
            $location.url('/user/'+model.userId);
        }
    }
})();