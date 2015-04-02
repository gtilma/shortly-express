var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link.js');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,

  links: function(){
    return this.hasMany(Link)
  },

  initialize: function(){
    this.on('creating', function(model, attrs, options){
      var pass = model.get('password')
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(pass, salt);
      model.set('password', hash);

      // asynchronous callback hell
      // = = = = = = = = = = = = = =
      // bcrypt.genSalt(10, function(err, salt){
        // bcrypt.hash(model.get('password'), null, null, function(err, hash){
        //   console.log("err", err)
        //   model.set('password', hash);
        //   console.log(model.attributes)
        // });
      // });
    });
  }
}, {

  login: function(username, password) {
    if (!username || !password) throw error('Username and password are both required');
    return new this({username: username.trim()}).fetch({require: true}).tap(function(password) {
      return bcrypt.compare(user.get('password'), password, function(err, result){
        if(err) console.log(err);
      });
    });
  }

});

module.exports = User;
