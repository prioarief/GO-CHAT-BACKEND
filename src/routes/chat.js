const express = require('express');
const router = express.Router();
const {
	sendMessage,
	getMessage,
	getMyMessage,
	updateMessageStatus,
} = require('../controllers/MessageController');
const tokenCheck = require('../middleware/checkToken');

router.get('/', tokenCheck, getMyMessage);
router.post('/send-message/:id', tokenCheck, sendMessage);
router.get('/:id', tokenCheck, getMessage);
router.put('/:id', tokenCheck, updateMessageStatus);

module.exports = router;
