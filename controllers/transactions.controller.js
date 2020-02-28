const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Transaction.find(req.query)
      .sort({ date: -1 })
      .populate('payee')
      .then(transactions => res.json(transactions))
      .catch(error => res.status(422).json(error));
  },
  findById: (req, res) => {
    db.Transaction.findById(req.params.id)
      .populate('payee')
      .then(transaction => res.json(transaction))
      .catch(error => res.status(422).json(error));
  },
  create: async (req, res) => {
    const { payee, amount, memo, date, isDebit } = req.body;

    const payeeId = await db.Payee.findOneAndUpdate(
      { name: payee },
      { name: payee },
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
      isDebit: isDebit,
      date: date
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
          totalBalance: transaction.isDebit ? -transaction.amount : transaction.amount
        }
      },
      { new: true }
    )
      .populate({
        path: 'transactions',
        populate: { path: 'payee' },
        options: { sort: { date: -1 } }
      })
      .then(user => res.json(user))
      .catch(error => {
        return res.status(422).json(error);
      });
  },
  update: async (req, res) => {
    // todo fix totalBalance calc / include original amount and new amount in the request.
    // todo make the calculation to calculate the new balance using only the difference
    // todo use the new amount to update the transaction
    const { amount, payee, memo, isDebit, date, mongoId, difference } = req.body;
    const { id } = req.params;

    try {
      // find Payee by name to get name and id, create a new payee if it doesn't exist.
      await db.Payee.findOneAndUpdate(
        { name: payee },
        { name: payee },
        {
          upsert: true,
          new: true
        },
        (error, payee) => {
          if (error) {
            throw `Error: ${error}`;
          } else {
            try {
              // find transaction by ID from params and update.
              db.Transaction.findOneAndUpdate(
                { _id: id },
                {
                  date,
                  payee: payee._id,
                  amount,
                  memo,
                  isDebit
                },
                {
                  new: true
                },
                (error, transaction) => {
                  if (error) {
                    throw `Error: ${error}`;
                  } else {
                    db.User.findOneAndUpdate(
                      { _id: mongoId },
                      {
                        $inc: {
                          totalBalance: transaction.isDebit ? -difference : difference
                        }
                      },
                      { new: true },
                      (error, user) => {
                        if (error) {
                          throw `Error: ${error}`;
                        } else {
                          res.json(user);
                        }
                      }
                    );
                  }
                }
              );
            } catch (error) {
              res.status(422).json(error);
            }
          }
        }
      );
    } catch (error) {
      res.status(422).json(error);
    }
  },
  remove: (req, res) => {
    db.Transaction.deleteMany()
      .then(data => res.json({ transactionsRemoved: data.deletedCount }))
      .catch(err => res.status(422).json(err));
  },
  removeById: (req, res) => {
    db.Transaction.deleteOne({ _id: req.params.id })
      .then(data => res.json({ transactionsRemoved: data.n }))
      .catch(err => res.status(422).json(err));
  }
};
