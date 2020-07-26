const express = require('express');
const router = express.Router();
const {
	register,
	login,
	getMyProfile,
} = require('../controllers/AuthController');

router.post('/register', register);
router.post('/login', login);
router.put('/profile/:id', login);
router.get('/profile/:id', getMyProfile);

module.exports = router;
