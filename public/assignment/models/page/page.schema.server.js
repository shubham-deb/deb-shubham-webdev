var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website:{type:mongoose.Schema.Types.ObjectId,ref:'WebsiteModel'},
    name:{type:String,unique:true},
    description:String,
    widgets:[{type:mongoose.Schema.Types.Mixed,ref:"WidgetModel"}],
    dateCreated:{type:Date,default:Date.now}
},{collection:'page'});

module.exports = pageSchema;