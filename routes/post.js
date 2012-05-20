var PostProvider = require('../models').PostProvider;
var PostProvider = new PostProvider();

exports.new = function(req, res){
  console.log('username: '+ req.session.user_name)
  PostProvider.save({
    body: req.param('body'),    
    author: req.session.user_name
  }, function(error, docs) {
	  res.redirect('/');
  });
}

exports.show = function(req, res){
  PostProvider.findById(req.param('id'), function(error, post) {
    res.render('post_show', {
      locals: {
        post: post
      }
    });
  });
}

exports.add_comment = function(req, res){
  PostProvider.addCommentToPost(req.body._id, {
    author: req.session.user_name,
    comment: req.body.comment,
    created_at: new Date()
  }, function(error, docs) {
    res.redirect('/posts/' + req.body._id)
  });
}