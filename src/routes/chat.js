const express = require('express');
const router = express.Router();
const { sendMessage, getMessage, getMyMessage } = require('../controllers/MessageController');

router.get('/', getMyMessage);
router.post('/send-message/:id', sendMessage);
router.get('/:id', getMessage);

module.exports = router;
