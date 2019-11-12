const router = require('express').Router();
const userRoutes = require('./users.routes');
const transactionRoutes = require('./transactions.routes');
const payeeRoutes = require('./payees.routes');

router.use('/transactions', transactionRoutes);
// router.use('/users', userRoutes);
// router.use('/payees', payeeRoutes);

module.exports = router;