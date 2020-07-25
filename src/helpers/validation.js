const auth = require('../middleware/validation/auth');
const message = require('../middleware/validation/message');

module.exports = {
	RegisterValidation: (data) => {
		return auth.registerValidation.validate(data);
	},
	LoginValidation: (data) => {
		return auth.loginValidation.validate(data);
	},
	sendMessageValidation: (data) => {
		return message.sendMessage.validate(data);
	},
	getMessageValidation: (data) => {
		return message.getMessage.validate(data);
	},
};
