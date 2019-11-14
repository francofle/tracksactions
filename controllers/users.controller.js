const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.User.find()
      .sort({name: 1})
      .then(users => res.json(users))
      .catch(error => res.status(422).json(error))
  },
  findTransactions: (req, res) => {
    db.User.findOne({_id: req.params.id})
      .populate({
        path: 'transactions',
        populate: {
          path: 'payee',
          select: 'name'
        },
        options: {
          sort: {
            date: -1
          }
        }
      })
      .select('transactions')
      .then(transactions => res.json(transactions))
      .catch(err => res.status(422).json(err));
  },
  transactionsByPayee: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .populate({path: 'transactions', populate: {path: 'payee'}})
      .then(user => {
        const transactionsByPayee = user.transactions.filter(transaction => req.body.payeeName === transaction.payee.name)
        res.json(transactionsByPayee);
      })
      .catch(err => res.status(422).json(err));
  }

};