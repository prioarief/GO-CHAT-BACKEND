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
	getMyProfile: async (req, res) => {
		const id = req.params.id;
		try {
			if (!id) {
				return response(res, false, 'Id is required', 502);
			}
			const data = await AuthModel.Myprofile(id);
			if (data.length === 1) {
				return response(res, true, data, 200);
			}
			return response(res, false, 'Data not found', 404);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	editProfile: async (req, res) => {
		const id = req.params.id;
		const data = req.body;
		const editData = async (id, data) => {
			const result = await AuthModel.EditProfile(id, data);
				if (result.affectedRows === 1) {
					return response(res, true, data, 200);
				}
				return response(res, false, 'Data not found', 404);
		}
		try {
			if (req.file !== undefined) {
				data.image = req.file.filename;
				await editData(id, data)
			}
			await editData(id, data)
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
};
