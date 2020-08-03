const express = require('express');
const router = express.Router();
const { sendMessage, getMessage, getMyMessage } = require('../controllers/MessageController');
const tokenCheck = require('../middleware/checkToken')

router.get('/', tokenCheck, getMyMessage);
router.post('/send-message/:id', tokenCheck, sendMessage);
router.get('/:id', tokenCheck, getMessage);

module.exports = router;
