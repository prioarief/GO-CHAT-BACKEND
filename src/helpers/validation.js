const auth = require('../middleware/validation/auth');

module.exports = {
	RegisterValidation: (data) => {
		return auth.registerValidation.validate(data)
	},
	LoginValidation: (data) => {
		return auth.loginValidation.validate(data)
	},
};
