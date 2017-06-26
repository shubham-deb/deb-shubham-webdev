(function () {
    angular
        .module("WebAppMaker")
        .controller('registerController',registerController);

    function registerController($location,userService) {
        // refers to the instance of the called controller
        var model = this;

        model.register = register;

        function register(username,password,password2) {
            //
            // if(typeof username === 'undefined' || username === "") {
            //     model.error = "Username should not be empty";
            //     return;
            // }
            // if(password != password2 || typeof password=== 'undefined' || typeof password2=== 'undefined' ||
            // password === "" || password2 === "") {
            //     model.error = "Passwords must match";
            //     return;
            // }

            if(username === undefined || password === undefined || password2 === undefined) {
                if (username === undefined) {
                    model.usernamealert = "Username is required";
                    model.error = true;
                }
                else{
                    model.usernamealert = false;
                }
                if (password === undefined) {
                    model.passwordalert = "Password is required";
                    model.error = true;
                }
                else{
                    model.passwordalert = false;
                }
                if (password2 === undefined) {
                    model.samepasswordalert = "Password is required";
                    model.error = true;
                }
                else{
                    model.samepasswordalert = false;
                }
                return;
            }

            model.usernamealert = false;
            model.passwordalert = false;
            model.samepasswordalert = false;

            if(password != password2){
                model.matchpassword = "Passwords must match";
                model.error = true;
                return;
            }

            model.matchpassword = false;

            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = true;
                },function () {
                    model.error = false;
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