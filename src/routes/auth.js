const express = require('express');
const router = express.Router();
const {register} = require('../controllers/AuthController')

router.post('/register', register);


module.exports = router
