const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let PurchaseSchema = new Schema(
  {
    aliceSigningPubkey: { type: String },
    bookId: { type: String, required: true },
    ethAddress: { type: String, required: true }, // of purchaser
    // ipfsPath: { type: String, required: true }, // can get from Book
    txn: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('Purchases', PurchaseSchema);
