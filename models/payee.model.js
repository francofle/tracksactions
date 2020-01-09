const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PayeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Payee = mongoose.model('Payee', PayeeSchema);

module.exports = Payee;
