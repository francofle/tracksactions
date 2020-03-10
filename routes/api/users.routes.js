const router = require('express').Router();
const usersController = require('../../controllers/users.controller');
const checkIfAuthenticated = require('../../controllers/firebaseAuth.middlewares');

//  '/api/users/' routes
router.route('/').get(checkIfAuthenticated, usersController.findAll);
//   .post(usersController.create);
//
router.route('/:id').get(checkIfAuthenticated, usersController.findTransactions);
//   .put(usersController.update)
//   .delete(usersController.delete);

router.route('/bypayees/:id').get(checkIfAuthenticated, usersController.transactionsByPayee);

router.route('/register').post(usersController.createUser);

router.route('/getuserobject').post(checkIfAuthenticated, usersController.getUserObject);

module.exports = router;
