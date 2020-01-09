const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// if no API Routes are hit:
router.use((req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

module.exports = router;
