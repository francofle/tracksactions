const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  payee: {
    type: Schema.Types.ObjectID,
    ref: "Payee"
  },
  amount: {
    type: mongoose.Decimal128,
    default: 0.0,
    required: true
  },
  memo: {
    type: String,
  },
  xType: {
    type: Boolean,
    required: true
  }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;