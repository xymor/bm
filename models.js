var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/barramisc');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Comments = new Schema({
    author     : String
  , comment    : String
  , created_at : Date
});

var Post = new Schema({
    id          : ObjectId
  , body        : String
  , author      : String
  , created_at  : Date
  , comments    : [Comments]
});

mongoose.model('Post', Post);
var Post = mongoose.model('Post');

PostProvider = function(){};

PostProvider.prototype.findAll = function(callback) {
  Post.find({}).sort('created_at', -1).execFind(function (err, posts) {
    callback( null, posts )
  });  
};

PostProvider.prototype.findById = function(id, callback) {
  Post.findById(id, function (err, post) {
    if (!err) {
	  callback(null, post);
	}
  });
};

PostProvider.prototype.save = function(params, callback) {
  var post = new Post({author: params['author'], body: params['body'], created_at: new Date()});
  post.save(function (err) {
    callback();
  });
};

PostProvider.prototype.addCommentToPost = function(postId, comment, callback) {
  this.findById(postId, function(error, post) {
    if(error){
	  callback(error)
	}
    else {
	  post.comments.push(comment);
	  post.save(function (err) {
	    if(!err){
		  callback();
	    }	
	  });
    }
  });
};

exports.PostProvider = PostProvider;
