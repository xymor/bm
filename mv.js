var express = require('express');
var app = module.exports = express.createServer();
var mongoStore = require('connect-mongo');
var post = require('./routes/post')
var auth = require('./routes/auth')
var home = require('./routes/home')
var pub = __dirname + '/public';

relativeDate = require('relative-date');
helpers = require('./helpers').html_helpers();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: pub, enable: ['sass'] }));
  app.use(express.static(pub));
  app.use(express.cookieParser());
  app.use(express.session({
    store: new mongoStore({ db: 'barramisc' }),
    secret: "0dcdb78ca1e6c3a374e33079457cbec289db6bc3"
  }));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.dynamicHelpers(require('./helpers').dynamicHelpers);

app.get('/', home.root);

app.get('/login', auth.login_form);
app.post('/login', auth.login);
app.get('/mock_login', auth.mock_login);
app.get('/logout', auth.logout);

app.post('/posts/new', post.new);
app.get('/posts/:id', post.show);
app.post('/posts/addComment', post.add_comment);

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}

