const router = require('express').Router();
const checkIfAuthenticated = require('../../controllers/firebaseAuth.middlewares');

router.route('/hello').get(checkIfAuthenticated, async (_, res) => {
  return res.json({ hello: 'Hola' });
});

module.exports = router;
