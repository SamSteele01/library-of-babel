const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.plugin(require('mongoose-unique-validator'), {
  address: 'address already exists.',
});

let AccountSchema = new Schema(
  {
    ethAddress: { type: String, required: true, unique: true },
    signingKey: { type: String },
    encryptingKey: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('Accounts', AccountSchema);
