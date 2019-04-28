const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let BookSchema = new Schema(
  {
    ethAddress: { type: String, required: true },
    labelHash: { type: String, required: true },
    // policyEncryptingPubkey: { type: String, required: true },
    ipfsPath: { type: String, required: true },
    ethPrice: { type: String, required: true },
    image: { type: Buffer },
    desc: { type: String },
    title: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('Books', BookSchema);
