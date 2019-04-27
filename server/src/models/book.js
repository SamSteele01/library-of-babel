const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let BookSchema = new Schema(
  {
    address: { type: String, required: true },
    label: { type: String, required: true },
    policyEncryptingPubkey: { type: String, required: true },
    ipfsHash: { type: String },
    ethPrice: { type: String, required: true },
    image: { type: Buffer },
    desc: { type: String },
    title: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('Books', BookSchema);
