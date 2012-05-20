exports.dynamicHelpers = {
  flash: function(req, res) {
    var messages = "";
    ['error','info'].forEach(function(type){
      messages += req.flash(type).join(';\n');
    });

    return messages;
  },

  session: function(req, res) {
    return req.session;
  }
};

exports.html_helpers = function() {

  var EN_AMP_RE = /&/g;
  var EN_LT_RE  = /</g;
  var EN_GT_RE  = />/g;
  var EN_QUOT_RE = /"/g;
  var EN_SINGLE_RE = /'/g;

  // encode text into HTML to avoid XSS attacks.
  // underscore templates do not auto encode. If in doubt, use this!
  function htmlEncode(text){
    text = ""+text;
    text = text.toString().replace(EN_AMP_RE, "&amp;");
    text = text.replace(EN_LT_RE, "&lt;");
    text = text.replace(EN_GT_RE, "&gt;");
    text = text.replace(EN_QUOT_RE, "&quot;");
    text = text.replace(EN_SINGLE_RE, "&#39;");
    return text;
  }

  var DE_GT_RE = /\&gt\;/g;
  var DE_LT_RE = /\&lt\;/g;
  var DE_QUOT_RE = /\&quot\;/g;
  var DE_SINGLE_RE = /\&#39\;/g;

  function htmlDecode(text){
    text = ""+text;
    text = text.toString().replace(DE_GT_RE, ">");
    text = text.replace(DE_LT_RE, "<");
    text = text.replace(DE_QUOT_RE, '"');
    text = text.replace(DE_QUOT_RE, '"');
    text = text.replace(DE_SINGLE_RE, '\'');
    return  text;
  }

  //from http://gist.github.com/492947 and http://daringfireball.net/2010/07/improved_regex_for_matching_urls
  var GRUBERS_URL_RE = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig

  function linkfy(text) {
    return text.replace(GRUBERS_URL_RE, function(url) {
      var displayURL = url;
      var targetURL = (/^\w+\:\//.test(url)?'':'http://') + url;
      return '<a href="'+htmlEncode(targetURL)+'">'+htmlEncode(displayURL)+'</a>';
    });
  }

  return {
    decode: htmlDecode,
    encode: htmlEncode,
    linkfy: linkfy
  }

}

