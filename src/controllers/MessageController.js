const {SendMessage, getMessage, getMyMessage} = require('../models/Message')
const { response } = require('../helpers/response');
const validate = require('../helpers/validation');
module.exports = {
	sendMessage: async (req, res) => {
        const data = req.body;
        data.receiver = 12
        data.sender = parseInt(req.params.id)
		try {
            console.log(data)
			const validation = validate.sendMessageValidation(data);
			if (validation.error === undefined) {
				const result = await SendMessage(data);
				if (result) {
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
            receiver: 12,
            sender: parseInt(req.params.id)
        }
		try {
			const validation = validate.getMessageValidation(data);
			if (validation.error === undefined) {
				const result = await getMessage(data);
				if (result) {
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
	getMyMessage: async (req, res) => {
        const id = 12
		try {
			// const validation = validate.getMessageValidation(data);
			const result = await getMyMessage(id);
			if (result) {
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
};
