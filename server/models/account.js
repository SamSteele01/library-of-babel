const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.plugin(require('mongoose-unique-validator'), {
  address: 'address already exists.',
});

let UploadSchema = new Schema({
  label: { type: String, required: true },
  ipfsHash: { type: String, required: true },
  ethPrice: { type: String, required: true },
});

let PurchaseSchema = new Schema({
  label: { type: String, required: true },
  ipfsHash: { type: String, required: true },
});

let AccountSchema = new Schema({
  address: { type: String, required: true, unique: true },
  signingKey: { type: String },
  encryptingKey: { type: String },
  uploads: [UploadSchema],
  purchases: [PurchaseSchema]
});

module.exports = mongoose.model('Accounts', AccountSchema);
