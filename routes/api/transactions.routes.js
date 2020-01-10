const router = require('express').Router();
const transactionsController = require('../../controllers/transactions.controller');
const checkIfAuthenticated = require('../../controllers/firebaseAuth.middlewares');

// "/api/transactions" route
router
  .route('/')
  .get(checkIfAuthenticated, transactionsController.findAll)
  .delete(transactionsController.remove);

// "/api/transcations/:id" route
router
  .route('/:id')
  .get(checkIfAuthenticated, transactionsController.findById)
  .post(checkIfAuthenticated, transactionsController.create)
  .put(transactionsController.update)
  .delete(transactionsController.removeById);

module.exports = router;
