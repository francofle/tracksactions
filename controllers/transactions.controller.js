const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Transaction.find(req.query)
      .sort({ date: -1 })
      .populate("payee")
      .then(transactions => res.json(transactions))
      .catch(error => res.status(422).json(error));
  },
  findById: (req, res) => {
    db.Transaction.find(req.params.id)
      .populate("payee")
      .then(transaction => res.json(transaction))
      .catch(error => res.status(422).json(error));
  },
  create: (req, res) => {
    const createTransaction = async () => {
      const { payeeName, amount, memo, isDebit} = req.body;

      const payeeId = await db.Payee.findOneAndUpdate(
        { name: payeeName },
        { name: payeeName },
        { new: true, upsert: true }
      )
        .then(payee => payee.id)
        .catch(error => {
          return res.status(422).json(error);
        });

      const transaction = await db.Transaction.create({
        payee: payeeId,
        amount: amount,
        memo: memo,
        isDebit: isDebit
      })
        .then(transaction => transaction)
        .catch(error => {
          return res.status(422).json(error);
        });

      await db.User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { transactions: transaction.id },
          $inc: {
            totalBalance: transaction.isDebit
              ? -transaction.amount
              : transaction.amount
          }
        },
        { new: true }
      )
        .populate({ path: "transactions", populate: { path: "payee" } })
        .then(user => res.json(user))
        .catch(error => {
          return res.status(422).json(error);
        });
    };

    if (!req.body) {
      res.status(422).json("Transaction incomplete.");
    } else {
      createTransaction();
    }
  },
  update: (req, res) => {
    db.Transaction.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    })
      .then(transaction => res.json(transaction))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    db.Transaction.deleteMany()
      .then(data => res.json({transactionsRemoved: data.deletedCount}))
      .catch(err => res.status(422).json(err));
  },
  removeById: (req, res) => {
    db.Transaction.deleteOne({_id: req.params.id})
      .then(data => res.json({transactionsRemoved: data.n}))
      .catch(err => res.status(422).json(err))
  }
};
