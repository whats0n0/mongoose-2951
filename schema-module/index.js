'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

var userSchema = new Schema({
  name: String,
  community_id: {type: mongoose.Schema.Types.ObjectId, ref: 'community'}
});

module.exports = userSchema;
