var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/myDb');

var blogPostSchema = mongoose.Schema({
    title:String,
    body:String,
    postDate:{type: Date,default:Date.now},
    likes:{type:Number,default:0}
},{collection:'blogpost'});

var blogModel = mongoose.model("BlogPost",blogPostSchema);

// createBlogPost({title:  "329",body:"329"})
//     .then(function (doc) {
//         console.log(doc);
//     },function (err) {
//         console.log(error);s
//     });

// findAlllBlogPosts()
//     .then(function (docs) {
//         console.log(docs);
//     },function (err) {
//         console.log(err);
//     });

// findAllBlogPostByTitle("327")
//     .then(function (docs) {
//         console.log(docs);
//     },function (err) {
//         console.log(err);
//     });

// updateBlogPost("593ad1fabced200598b8a386",{body:"1234567"})
//     .then(function (status) {
//         return findBlogPostById("593ad1fabced200598b8a386",{body:"12345"})
//     },function (error) {
//         console.log(error);
//     })
//     .then(function (post) {
//         console.log(post);
//     },function (error) {
//         console.log(error);
//     });

deleteBlogPost("593ad1fabced200598b8a386",{body:"1234567"})
    .then(function (status) {
        return findAlllBlogPosts();
    },function (error) {
        // console.log(error);
    })
    .then(function (posts) {
        // console.log(posts);
    },function (error) {
        // console.log(error);
    });

function deleteBlogPost(postId) {
    return blogModel.remove({_id:postId});
}

function findBlogPostById(postId) {
    return blogModel.find({_id:postId});
}

function updateBlogPost(postId,newPost) {
    return blogModel.update({_id:postId},{$set:newPost});
}

function findAllBlogPostByTitle(title) {
    return blogModel.find({title:title});
}


function findAlllBlogPosts() {
    return blogModel.find();
}

function createBlogPost(blogpost) {
     return blogModel
        .create(blogpost);
}
