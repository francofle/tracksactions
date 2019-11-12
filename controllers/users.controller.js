const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.User.find(req.query)
      .sort({name: 1})
      .then(users => res.json(users))
      .catch(error => res.status(422).json(error))
  }
};