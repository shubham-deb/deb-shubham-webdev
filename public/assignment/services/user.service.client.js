/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .factory('userService',userService);
    
    function userService($http,$location) {
        var api = {
            findUserById : findUserById,
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            login:login,
            deleteUser : deleteUser,
            createUser : createUser,
            findUsers: findUsers,
            updateUser: updateUser,
            checkLoggedIn:checkLoggedIn,
            logout:logout,
            registerUser:registerUser
        };
        // returns the object that could be used by other controllers to modify data.
        return api;

        function registerUser(user) {
            var url = "/api/register";
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                })

        }
        
        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function login(username,password) {
            var url = "/api/login";
            var credentials = {
                username:username,
                password:password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                })
        }

        function findUserByCredentials(username,password) {
            var url = "/api/assignment/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    // console.log(response);
                    return response.data;
                },function (err) {
                    console.log(err);
                })
            // var user = findUserById(userId);
            // var index = users.indexOf(user);
            // users.splice(index,1);
        }
        
        function createUser(user) {
            var url = "/api/assignment/user";
            // first takes url , second is the actual data
            return $http
                .post(url,user)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId,user) {
            var url = "/api/assignment/user/"+userId;
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                })
            // var index = users.indexOf(u);
            // u.firstName = user.firstName;
            // u.lastName = user.lastName;
            // u.username = user.username;
            // u.email = user.email;
            //
            // users[index]=u;
        }

        function findUsers() {
            var url = '/api/assignment/user';
            return $http.get(url)
                .then(function (response){
                    return response.data;
                })
        }
        
        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();