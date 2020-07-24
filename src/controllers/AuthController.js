const { genSaltSync, compareSync, hashSync } = require('bcrypt');
const AuthModel = require('../models/Auth');
const { createToken } = require('../helpers/CreateToken');
const validate = require('../helpers/validation');
module.exports = {
	register: async (req, res) => {
		const data = req.body;
		try {
			const validation = validate.RegisterValidation(data);
			if (validation.error === undefined) {
				data.password = hashSync(req.body.password, genSaltSync(1));
				const result = await AuthModel.Register(data);
				if (result) {
					return res.status(200).json({
						success: true,
						message: 'Register Success',
						data: result,
					});
				}
				return res.status(400).json({
					success: false,
					message: 'Register Failled',
				});
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return res.status(502).json({
				success: false,
				message: errorMessage,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
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
                        result[0].token = token
						delete result[0].password;
						return res.status(200).json({
							success: true,
							message: 'login Success',
							data: result,
						});
					}
					return res.status(502).json({
						success: false,
						message: 'Password wrong',
					});
				}
				return res.status(400).json({
					success: false,
					message: 'Account is not registered',
				});
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return res.status(502).json({
				success: false,
				message: errorMessage,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	},
};
