var AuthProvider = require('../lib/Auth').AuthProvider;
var AuthProvider = new AuthProvider();

exports.login_form = function(req, res) {
  res.render('login',{});
};

exports.login = function(req, res){
  AuthProvider.getLDAPAuth().login(req.param('login'), req.param('password'),
    function(logado) {
      if(logado) {
        req.session.logged = true;
        req.session.user_name = req.param('login');
        req.session.save();
        res.redirect('/');
      } else {
        req.flash('error','Usuário/Senha incorretos.');
        res.redirect('/login');
      }
    },
    function(error) {
      console.log('Erro ao efetuar login: ' + error);
      req.flash('error','Ocorreu um erro ao efetuar o login. Por favor, tente mais tarde.');
      res.redirect('/login');
    }
  );
};

exports.mock_login = function(req, res) {
  AuthProvider.getMockAuth().login('mock', 'mock', function(){
    req.session.logged = true;
    req.session.user_name = 'mock_login';
    req.session.save();
    res.redirect('/');
  });
};

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
};

