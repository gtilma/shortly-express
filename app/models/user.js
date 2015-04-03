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
    this.on('creating', function(){
      var encrypt = Promise.promisify(bcrypt.hash);

      return encrypt(this.get('password'), null, null)
        .bind(this)
        .then(function(hash) {
          this.set('password', hash);
        });
    });
  },

  comparePassword: function(inputPassword, callback) {
    bcrypt.compare(inputPassword, this.get('password'), function(err, match) {
      callback(match);
    });
  }
});

module.exports = User;
