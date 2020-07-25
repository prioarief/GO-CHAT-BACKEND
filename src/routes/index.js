const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const chatRoute = require('./chat');

router.use('/api/auth', authRoute);
router.use('/api/message', chatRoute);

module.exports = router;
