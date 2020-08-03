const express = require('express');
const router = express.Router();
const upload = require('../helpers/uploadImage');
const tokenCheck = require('../middleware/checkToken')
const {
	register,
	login,
	getMyProfile,
    editProfile,
	addContact,
	getContact,
	searchUsername,
} = require('../controllers/AuthController');

router.post('/register', register);
router.post('/login', login);
router.put('/profile', tokenCheck, upload.single('image'), editProfile);
router.get('/profile', tokenCheck, getMyProfile);
router.get('/contact', tokenCheck, getContact);
router.put('/contact/:id', tokenCheck, addContact);
router.post('/contact', tokenCheck, searchUsername);

module.exports = router;
