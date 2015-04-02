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

/*

var checkit  = require('checkit');
var Promise  = require('bluebird');
var bcrypt   = Promise.promisifyAll(require('bcrypt'));

var Customer = bookshelf.Model.extend({

  initialize: function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    return checkit(rules).run(this.attributes);
  },

  account: function() {
    return this.belongsTo(Account);
  },

}, {

  login: Promise.method(function(email, password) {
    if (!email || !password) throw new Error('Email and password are both required');
    return new this({email: email.toLowerCase().trim()}).fetch({require: true}).tap(function(customer) {
      return bcrypt.compareAsync(customer.get('password'), password);
    });
  })

});

Customer.login(email, password)
  .then(function(customer) {
    res.json(customer.omit('password'));
  }).catch(Customer.NotFoundError, function() {
    res.json(400, {error: email + ' not found'});
  }).catch(function(err) {
    console.error(err);
  });

  */