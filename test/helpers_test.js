var assert = require('assert');
var helpers = require('../helpers').html_helpers();

exports['test html_helpers().linkfy'] = function(){
    assert.equal('<a href="http://diogosantos.com">http://diogosantos.com</a>', helpers.linkfy('http://diogosantos.com'));
};
