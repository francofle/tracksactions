const db = require("../models");
const axios = require("axios");
const moment = require("moment");

require("../config/connection");

const seedDB = async () => {
  await db.User.deleteMany();
  await db.Transaction.deleteMany();
  await db.Payee.deleteMany();

  let userId = "";
  let transaction = "";
  let payeeId = "";
  let user = {};

  userId = await db.User.create({
    name: "Leanne Graham",
    email: "sincere@april.biz",
    firebaseId: "Leanne's FBID",
    totalBalance: 2000
  }).then(user => user.id);

  payeeId = await db.Payee.findOneAndUpdate(
    {
      name: "Advanced Auto Parts"
    },
    {
      name: "Advanced Auto Parts"
    },
    {
      new: true,
      upsert: true
    }
  ).then(payee => payee.id);

  transaction = await db.Transaction.create({
    amount: 31.2,
    memo: "Cadillac parts",
    isDebit: true,
    payee: payeeId
  }).then(transaction => transaction);

  await db.User.findOneAndUpdate(
    { _id: userId },
    { $push: { transactions: transaction.id },
      $inc: {totalBalance: transaction.isDebit ? -transaction.amount : transaction.amount} },
    { new: true }
  );

  // SECOND TRANSACTION SAME USER

  payeeId = await db.Payee.findOneAndUpdate(
    {
      name: "AMC Cinemas"
    },
    {
      name: "AMC Cinemas"
    },
    {
      new: true,
      upsert: true
    }
  ).then(payee => payee.id);

  transaction = await db.Transaction.create({
    date: moment("20190101", "YYYYMMDD").format(),
    payee: payeeId,
    amount: 22.99,
    memo: "New Year's movie night",
    isDebit: true
  }).then(transaction => transaction);

  await db.User.findOneAndUpdate(
    { _id: userId },
    { $push: { transactions: transaction.id },
    $inc: {totalBalance: transaction.isDebit ? -transaction.amount : transaction.amount}},
    { new: true }
  );

  user = await db.User.find()
    .populate({
      path: "transactions",
      populate: {
        path: "payee"
      }
    })
    .then(data => data);

  console.log(`ID: ${user[0].id}`);
  console.log(`Name: ${user[0].name}`);
  console.log(`email: ${user[0].email}`);
  console.log(`FBID: ${user[0].firebaseId}`);
  console.log(`Balance: ${user[0].totalBalance}`);
  console.log("Transactions:");
  console.log(
    user[0].transactions.map(transaction => {
      console.log(`
    Trx Date: ${transaction.date}
    Trx Amount: $${parseFloat(transaction.amount).toFixed(2)}
    Trx Payee: ${transaction.payee.name}
    Trx Date: ${transaction.memo}
    Trx isDebit: ${transaction.isDebit}`);
    })
  );
};

seedDB();

//
//
// const transactionSeed = [
//   ,
//   {
//
//   },
//   {
//     date: moment("20190131", "YYYYMMDD").format(),
//     payee: "Payroll",
//     amount: 2500,
//     memo: "first paycheck of the year",
//     isDebit: true
//   },
//   {
//     date: moment("20191031", "YYYYMMDD").format(),
//     payee: "Party City",
//     amount: 92.3,
//     memo: "Halloween Costumes and party supplies",
//     isDebit: false
//   },
//   {
//     payee: "Lincoln Brewery",
//     amount: 52.29,
//     isDebit: true
//   }
// ];
//
// db.Transaction.remove({})
//   .then(() => db.Transaction.collection.insertMany(transactionSeed))
//   .then(data => {
//     console.log(`${data.result.n} Transactions inserted`);
//   })
//   .catch(error => `Error inserting Transactions: ${error}`);
// Payee seed
