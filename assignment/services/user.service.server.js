var app = require('../../express');

var users =
    [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


app.delete('/api/assignment/user/:userId',deleteUser);
app.put('/api/assignment/user/:userId',updateUser);
// Reading data from the client and validating
app.get('/api/assignment/user/:userId',findUserById);
app.get('/api/assignment/user',findAllUsers);
// Updates the data that is currently residing in the server and sent from the client
app.post('/api/assignment/user',createUser);
// to remove we use delete
// to update or create an new data which is not residing in the server, we use put
// Reading data from the client and validating

function findUserById(req,res) {
    var userId = req.params.userId;
    for(var u in users){
        user = users[u];
        if(user._id === userId) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}

function findAllUsers(req,res) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password){
        for(var u in users){
            user = users[u];
            if(user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
    else if(username) {
        for(var u in users){
            user = users[u];
            if(user.username === username) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
    else
    {
        res.json(users);
    }
}

function createUser(req,res) {
    var user = req.body;
    user._id = (new Date()).getTime()+"";
    users.push(user);
    res.json(user);
}

function updateUser(req,res) {
    var updateUser = req.body;
    for(var u in users){
        if(users[u]._id === req.params.userId) {
            users[u]=updateUser;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req,res) {
    for(var u in users){
        if(users[u]._id === req.params.userId) {
            users.splice(u,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}