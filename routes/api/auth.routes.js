const router = require("express").Router();
const createUser = require("../../controllers/auth.controller");
const checkIfAuthenticated = require("../../controllers/firebaseAuth.middlewares");

router.route("/").post(createUser);

router.route("/hello").get(checkIfAuthenticated, async (_, res) => {
  return res.json({ hello: "Hola" });
});

module.exports = router;
