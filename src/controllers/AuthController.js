const { genSaltSync, compareSync, hashSync } = require('bcrypt');
const AuthModel = require('../models/Auth');
const { createToken } = require('../helpers/CreateToken');
const validate = require('../helpers/validation');
const { response } = require('../helpers/response');

module.exports = {
	register: async (req, res) => {
		const data = req.body;
		try {
			const validation = validate.RegisterValidation(data);
			if (validation.error === undefined) {
				data.password = hashSync(req.body.password, genSaltSync(1));
				const result = await AuthModel.Register(data);
				if (result) {
					return response(res, true, result, 200);
				}
				return response(res, false, 'Register Failled', 400);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 502);
		} catch (error) {
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	login: async (req, res) => {
		const data = req.body;
		try {
			const validation = validate.LoginValidation(data);
			if (validation.error === undefined) {
				const result = await AuthModel.Login(data.username);
				if (result.length === 1) {
					const PasswordHash = result[0].password;
					if (compareSync(data.password, PasswordHash)) {
						let token = createToken(result, process.env.JWT_KEY, '24h');
						result[0].token = token;
						delete result[0].password;
						return response(res, true, result, 200);
					}
					return response(res, false, 'Password wrong', 502);
				}
				return response(res, false, 'Account is not registered', 400);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 502);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
};
