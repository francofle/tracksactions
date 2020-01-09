const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Payee.find()
      .sort({ name: 1 })
      .then(payees => res.json(payees))
      .catch(error => res.status(422).json(error));
  }
};
