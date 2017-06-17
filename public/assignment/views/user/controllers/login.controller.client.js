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
            // var found = userService.findUserByCredentials(username,password);

            if(username === undefined || password === undefined) {
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
                return;
            }

            model.usernamealert = false;
            model.passwordalert = false;

            userService
                .login(username,password)
                .then(function (user) {
                    if(user!="" || user!=null) {
                        $location.url('/profile');
                        model.error = false;
                    }
                },function (err) {
                    console.log(err);
                });
    }

    }
})();