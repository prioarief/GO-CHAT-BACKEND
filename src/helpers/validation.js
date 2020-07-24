const auth = require('../middleware/validation/auth');

module.exports = {
	AuthValidation: (data) => {
		return auth.registerValidation.validate(data)
	},
};
