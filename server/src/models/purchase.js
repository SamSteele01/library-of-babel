const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let PurchaseSchema = new Schema(
  {
    ethAddress: { type: String, required: true },
    bookId: { type: String, required: true },
    labelHash: { type: String, required: true }, // book label. Not unique until enrico is changed
    txn: { type: String, required: true },
    aliceSigningPubkey: { type: String }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('Purchases', PurchaseSchema);
