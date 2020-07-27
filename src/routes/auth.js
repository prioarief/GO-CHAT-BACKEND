const express = require('express');
const router = express.Router();
const upload = require('../helpers/uploadImage');
const {
	register,
	login,
	getMyProfile,
    editProfile,
} = require('../controllers/AuthController');

router.post('/register', register);
router.post('/login', login);
router.put('/profile/:id', upload.single('image'), editProfile);
router.get('/profile/:id', getMyProfile);

module.exports = router;
