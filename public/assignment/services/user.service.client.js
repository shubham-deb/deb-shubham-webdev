/**
 * Created by debsh on 25-05-2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        // declaring the instance by name and we can refer to the services by using the instance
        .factory('userService',userService);
    
    function userService() {
        var users =
            [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];
        var api = {
            findUserById : findUserById,
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            deleteUser : deleteUser,
            createUser : createUser,
            findUsers: findUsers,
            updateUser: updateUser
        };
        // returns the object that could be used by other controllers to modify data.
        return api;

        function findUserById(userId) {
            for(var u in users){
                user = users[u];
                if(user._id === userId)
                    return user;
            }
            return null;
        }


        function findUserByCredentials(username,password) {
            for(var u in users){
                user = users[u];
                if(user.username === username &&
                    user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            var user =  users.find(function (user) {
                return user.username === username
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index,1);
        }
        
        function createUser(user) {
            user._id = (new Date()).getTime()+"";
            users.push(user);
            return user;
        }

        function updateUser(userId,user) {
            var u = findUserById(userId);
            var index = users.indexOf(u);

            u.firstName = user.firstName;
            u.lastName = user.lastName;
            u.username = user.username;
            u.email = user.email;

            users[index]=u;

        }

        function findUsers() {
            return users;
        }
    }
})();