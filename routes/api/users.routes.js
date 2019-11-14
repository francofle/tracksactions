const router = require('express').Router();
const usersController = require('../../controllers/users.controller');

router.route('/')
  .get(usersController.findAll)
//   .post(usersController.create);
//
router.route('/:id')
  .get(usersController.findTransactions);
//   .put(usersController.update)
//   .delete(usersController.delete);

router.route('/byPayees/:id')
  .get(usersController.transactionsByPayee);

module.exports = router;