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
            userService
                .findUserById(model.userId)
                // This is a promise or callback function which is executed once it gets a successful message from
                // the server.
                .then(renderUser, userError);
            userService
                .findUsers()
                .then(function (users) {
                    model.users = users;
                });
        }
        init();

        function renderUser(user) {
            model.user = user;
            model.username = model.user.username;
            model.firstName = model.user.firstName;
            model.email = model.user.email;
            model.lastName = model.user.lastName;
        }
        
        function userError(error) {
            model.error = "User not found";
        }

        function deleteProfile() {
            userService
                .deleteUser(model.userId)
                .then(function () {
                    $location.url('/login');
                },function () {
                    model.error = "Unable to remove your profile";
                });

        }

        function updateProfile() {
            model.error = "";
            model.message = "";
            if(model.username === "") {
                model.error = "You must have a username";
                return;
            }
            userService
                    .findUserById(model.userId)
                    .then(function (getUser) {
                        user = {
                            _id:model.userId,
                            password:getUser.password,
                            username: model.username,
                            firstName: model.firstName,
                            lastName: model.lastName,
                            email: model.email
                        };
                        userService
                            .updateUser(model.userId,user)
                            .then(function () {
                                model.message = "Profile updated successfully";
                            });
                    });

        }
    }
})();