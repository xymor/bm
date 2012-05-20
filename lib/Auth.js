LDAPAuth = function(server, port) {
  if(server != undefined)
    this.config.server = server;
  if(port != undefined)
    this.config.port = port;
};

LDAPAuth.prototype = {
  config: { server: 'gurgel', port: 389 },

  login: function(login, password, okCallBack, errCallBack) {
    var ldap = require('./node-ldapauth/ldapauth');
    ldap.authenticate(this.config.server, this.config.port,'IDEAIS\\' + login, password, function(err, result){
      if(err) {
       errCallBack(err);
      } else {
       okCallBack(result);
      }
    });
  }
};

MockAuth = function() {};

MockAuth.prototype = {
  login: function(login, password, okCallBack, errCallBack) {
    okCallBack();
  }
}

var AuthProvider = function() {};

AuthProvider.prototype = {
  getLDAPAuth: function(server, port) {
    return new LDAPAuth(server, port);
  },

  getMockAuth: function() {
    return new MockAuth();
  }
};

exports.AuthProvider = AuthProvider;

