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
      bcrypt.hash(model.get('password'), null, null, function(err, hash){
        model.set('password', hash);
      });
    });

  // var username = req.body.username;
  // var password = req.body.password;
  // db.knex('users')
  //   .where('username', '=', username)
  //   .then(function(users){
  //     if(users['0'] && users['0']['password'] === password){
  //       res.redirect('/links');
  },

  add: function(user, pass){

  }

  

});

module.exports = User;
