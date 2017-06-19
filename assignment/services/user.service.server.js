var app = require('../../express');
var bcrypt = require("bcrypt-nodejs");
var userModel = require('../../public/assignment/models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/register',register);
app.post('/api/logout',logout);
app.get('/api/checkLoggedIn',checkLoggedIn);
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

app.post('/api/login',passport.authenticate('local'),login);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
var facebookConfig = {
    // clientID     : "242625612892833",
    // clientSecret : "0c36a8f1fbe8ca589dfc83ca8dfd442e",
    // callbackURL  : "https://deb-shubham-webdev.herokuapp.com/auth/facebook/callback",
    clientID     : "140854839803832",
    clientSecret : "ab16f9b58d926d1b427933cb4711a78d",
    callbackURL  : "https://deb-shubham-webdev.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    console.log(profile);
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  emailParts[0],
                        firstName: profile.name[0],
                        lastName:  profile.name[1],
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
        userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                console.log(user);
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function register(req,res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            req
                .login(user,function (status) {
                    res.send(status);
                });
        });
}

function logout(req, res) {
    // removes the user from the session by invalidating the cookie
    req.logOut();
    res.sendStatus(200);
}

function checkLoggedIn(req,res) {
    // if the current user is currently logged in, then send the user
    if(req.isAuthenticated())
        res.send(req.user);
    else
        res.send('0');
}

// what we are putting in the cookie
function serializeUser(user, done) {
    done(null, user);
}

// we extract the user by finding the user by id by unwrapping the user object from the cookie
function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

// This function will generate a response before we reach the login function
// So if the user exists it will return the user otherwise it will not
function localStrategy(username, password, done) {
    userModel
        .findAllUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function login(req,res) {
    res.json(req.user);
}

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
            .findAllUserByUsername(username)
            .then(function (user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return user;
                } else {
                    return null;
                }
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