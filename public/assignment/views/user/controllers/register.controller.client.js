(function () {
    angular
        .module("WebAppMaker")
        .controller('registerController',registerController);

    function registerController($location,userService) {
        // refers to the instance of the called controller
        var model = this;

        model.register = register;

        function register(username,password,password2) {

            if(typeof username === 'undefined' || username === "") {
                model.error = "Username should not be empty";
                return;
            }
            if(password != password2 || typeof password=== 'undefined' || typeof password2=== 'undefined' ||
            password === "" || password2 === "") {
                model.error = "Passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = "username already exists";
                },function () {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    // return userService
                    //     .createUser(newUser)
                    return userService
                        .registerUser(newUser);
                })
                .then(function (user) {
                    $location.url('/profile');
                });
        }
    }
})();