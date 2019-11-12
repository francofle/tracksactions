const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Payee.find(req.query)
      .sort({date: 1})
      .then(payee => res.json(payee))
      .catch(error => res.status(422).json(error));
  },
  findById: (req, res) => {

  },
  create: (req, res) => {

  },
  update: (req, res) => {

  },
  remove: (req, res) => {

  }
};


