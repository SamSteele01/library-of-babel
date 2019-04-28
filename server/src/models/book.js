const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let BookSchema = new Schema(
  {
    /* create */
    // accountId: { type: String, required: true }, // uploader
    ethAddress: { type: String, required: true }, // uploader
    ethPrice: { type: String, required: true },
    ipfsPath: { type: String, required: true },
    labelHash: { type: String, required: true },
    policyEncryptingPubkey: { type: String, required: true },
    /* update */
    descLong: { type: String },
    descShort: { type: String },
    image: { type: Buffer },
    title: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('Books', BookSchema);
