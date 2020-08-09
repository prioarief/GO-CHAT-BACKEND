const {
	SendMessage,
	getMessage,
	getMyMessage,
	updateStatusMessage,
} = require('../models/Message');
const { response } = require('../helpers/response');
const validate = require('../helpers/validation');

module.exports = {
	sendMessage: async (req, res) => {
		const data = req.body;
		data.user = req.decoded.result[0].id;
		data.receiver = parseInt(req.params.id);
		try {
			const validation = validate.sendMessageValidation(data);
			if (validation.error === undefined) {
				const result = await SendMessage(data);
				if (result) {
					req.io.emit('chat', result);
					return response(res, true, result, 200);
				}
				return response(res, false, 'Send Failled', 400);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 502);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	getMessage: async (req, res) => {
		const data = {
			user: req.decoded.result[0].id,
			receiver: parseInt(req.params.id),
		};
		try {
			// const validation = validate.getMessageValidation(data);
			const result = await getMessage(data);
			if (result) {
				// console.log(req.io, 'req io');
				return response(res, true, result, 200);
			}
			return response(res, false, 'Send Failled', 400);
			// if (validation.error === undefined) {
			// }
			// let errorMessage = validation.error.details[0].message;
			// errorMessage = errorMessage.replace(/"/g, '');
			// return response(res, false, errorMessage, 502);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	getMyMessage: async (req, res) => {
		const me = req.decoded.result[0].id;
		try {
			// const validation = validate.getMessageValidation(data);
			const result = await getMyMessage(me);
			if (result) {
				req.io.emit('chat-list', result, me);
				// console.log(result)
				return response(res, true, result, 200);
			}
			return response(res, false, 'Send Failled', 400);
			// if (validation.error === undefined) {
			// }
			// let errorMessage = validation.error.details[0].message;
			// errorMessage = errorMessage.replace(/"/g, '');
			// return response(res, false, errorMessage, 502);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	updateMessageStatus: async (req, res) => {
		const data = {
			me: req.decoded.result[0].id,
			id: parseInt(req.params.id),
		};
		try {
			// const validation = validate.getMessageValidation(data);
			const result = await updateStatusMessage(data);
			req.io.emit('read', data.id);
			return response(res, true, result, 200);
			// if (result) {
				// req.io.emit('chat-list', result);
			// 	// console.log(result)
			// }
			// return response(res, false, 'Send Failled', 400);
			// if (validation.error === undefined) {
			// }
			// let errorMessage = validation.error.details[0].message;
			// errorMessage = errorMessage.replace(/"/g, '');
			// return response(res, false, errorMessage, 502);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
};
