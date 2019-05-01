'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.plugin(require('mongoose-unique-validator'), {
  ethAddress: 'ethAddress already exists.'
});

var AccountSchema = new Schema({
  ethAddress: { type: String, required: true, unique: true },
  signingKey: { type: String },
  encryptingKey: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Accounts', AccountSchema);