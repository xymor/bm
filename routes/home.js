var PostProvider = require('../models').PostProvider;
var PostProvider = new PostProvider();

exports.root = function(req, res){
  console.log(req.session);
  if(!req.session.logged) {
    res.render('login', {});
  } else {
    PostProvider.findAll(function(error, posts){
      res.render('index', {
	      locals: {
          posts: posts
        }
	    });
    })
  }
}