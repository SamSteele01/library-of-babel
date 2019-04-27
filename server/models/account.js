const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.plugin(require('mongoose-unique-validator'), {
  address: 'address already exists.',
});

let AccountSchema = new Schema(
  {
    address: { type: String, required: true, unique: true },
    signingKey: { type: String },
    encryptingKey: { type: String },
    uploads: [UploadSchema],
    purchases: [PurchaseSchema]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('Accounts', AccountSchema);
