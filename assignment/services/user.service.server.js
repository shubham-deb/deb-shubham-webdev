var app = require('../../express');
var userModel = require('../../public/assignment/models/user/user.model.server');


app.delete('/api/assignment/user/:userId',deleteUser);
app.put('/api/assignment/user/:userId',updateUser);
// Reading data from the client and validating
app.get('/api/assignment/user/:userId',findUserByUserId);
app.get('/api/assignment/user',findAllUsers);
// Updates the data that is currently residing in the server and sent from the client
app.post('/api/assignment/user',createUser);
// to remove we use delete
// to update or create an new data which is not residing in the server, we use put
// Reading data from the client and validating

function findUserByUserId(req,res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        },function (err) {
            // console.log(err);
        })
}

function findAllUsers(req,res) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password){
        userModel
            .findAllUserByCredentials(username,password)
            .then(function (user) {
                res.send(user);
            },function (err) {
                res.sendStatus(400);
            })
    }
    else if(username) {
        userModel
            .findAllUserByUsername(username)
            .then(function (user) {
                if(user)
                    res.json(user);
                else
                    res.sendStatus(404);
            });
    }
    else
    {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.send(users);
            });
        res.sendStatus(200);
    }
}

function createUser(req,res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function updateUser(req,res) {
    var updateUser = req.body;
    var userId  = req.params.userId;
    userModel
        .updateUser(userId,updateUser)
        .then(function (user) {
            res.send(user);
        });
}

function deleteUser(req,res) {
    console.log("in service server file");
    var userId  = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(err);
        });
}