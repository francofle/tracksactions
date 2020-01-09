const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firebaseId: {
    type: String
  },
  totalBalance: {
    type: mongoose.Decimal128,
    required: true
  },
  transactions: [
    {
      type: Schema.Types.ObjectID,
      ref: 'Transaction'
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
