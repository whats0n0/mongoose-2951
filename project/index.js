'use strict';

var assert = require('assert');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/gh2951');
mongoose.set('debug', true);

// This works fine
// var userSchema = new Schema({
//   name: String,
//   community_id: {type: mongoose.Schema.Types.ObjectId, ref: 'community'}
// });

// If the schema is instead created in a module with
// a separate mongoose instance, it doesn't work
var userSchema = require('../schema-module');

var User = mongoose.model('User', userSchema);

User.remove({}, function(error) {
  assert.ifError(error);
  User.collection.insertOne({ name: 'test', community_id: new mongoose.Types.ObjectId('000000000000000000000000') }, function(error) {
    assert.ifError(error);
    User.findOne({ name: 'test' }, function(error, doc) {
      assert.ifError(error);
      assert.ok(doc.community_id);
      console.log('done');
      process.exit(0);
    });
  });
});
