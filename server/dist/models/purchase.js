'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PurchaseSchema = new Schema({
  address: { type: String, required: true },
  label: { type: String, required: true }, // book label
  txn: { type: String, required: true },
  aliceSigningPubkey: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Purchases', PurchaseSchema);