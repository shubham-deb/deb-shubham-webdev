var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:{type:String},
    password:{type:String},
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    websites:[{type:mongoose.Schema.Types.ObjectId,ref:"WebsiteModel"}],
    dateCreated:{type:Date,default:Date.now},
    google: {
        id:String,
        token:String
    },
    facebook: {
        id:    String,
        token: String
    }
},{collection:'user'});

module.exports = userSchema;