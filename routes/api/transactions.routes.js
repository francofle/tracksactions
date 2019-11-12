const router = require("express").Router();
const transactionsController = require("../../controllers/transactions.controller");

// "/api/transactions" route
router
  .route("/")
  .get(transactionsController.findAll)
  .delete(transactionsController.remove);

// "/api/transcations/:id" route
router
  .route("/:id")
  .get(transactionsController.findById)
  .post(transactionsController.create)
  .put(transactionsController.update)
  .delete(transactionsController.removeById);

module.exports = router;
