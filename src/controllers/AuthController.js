const { genSaltSync, compareSync, hashSync } = require('bcrypt');
const AuthModel = require('../models/Auth');
const { createToken } = require('../helpers/CreateToken');
const validate = require('../helpers/validation');
const { response } = require('../helpers/response');
const fs = require('fs');

module.exports = {
	register: async (req, res) => {
		const data = req.body;
		try {
			const validation = validate.RegisterValidation(data);
			if (validation.error === undefined) {
				let UsernameCheck = await AuthModel.Login(data.username);
				if (UsernameCheck.length !== 1) {
					data.password = hashSync(req.body.password, genSaltSync(1));
					const result = await AuthModel.Register(data);
					if (result) {
						delete result.password;
						return response(res, true, result, 200);
					}
					return response(res, false, 'Register Failled', 400);
				}
				return response(res, false, 'Username has been registered', 502);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 502);
		} catch (error) {
			console.log(error);
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
						let token = createToken(result, process.env.JWT_KEY);
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
		const id = req.decoded.result[0].id;
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
		const id = req.decoded.result[0].id;
		const data = req.body;
		const cek = await AuthModel.Myprofile(id);
		const image = cek[0].image;
		console.log(image);
		try {
			const editData = async (id, data) => {
				if (data.password) {
					data.password = hashSync(req.body.password, genSaltSync(1));
				}
				const result = await AuthModel.EditProfile(id, data);
				if (result.affectedRows === 1) {
					const newData = await AuthModel.Myprofile(id);
					const token = createToken(newData, process.env.JWT_KEY);
					newData[0].token = token;
					delete newData[0].password;
					return response(res, true, newData[0], 200);
				}
				return response(res, false, 'Data not found', 404);
			};
			if (req.file !== undefined) {
				if (image !== null) {
					fs.unlinkSync(`./src/images/${image}`);
					data.image = req.file.filename;
					return await editData(id, data);
				}
				data.image = req.file.filename;
				return await editData(id, data);
			}
			await editData(id, data);
		} catch (error) {
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	addContact: async (req, res) => {
		const id = req.decoded.result[0].id;
		const friendId = req.params.id;
		try {
			const data = {
				user_id: id,
				friend_id: friendId,
			};

			const result = await AuthModel.AddContact(data);
			if (result.affectedRows === 1) {
				return response(res, true, 'Add Contact Success', 200);
			}
			return response(res, false, 'Add Contact Success', 402);
		} catch (error) {
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	getContact: async (req, res) => {
		const id = req.decoded.result[0].id;
		try {
			const result = await AuthModel.getContact(id);
			return response(res, true, result, 200);
			// if(result.length > 0){
			// }
			// return response(res, false, 'Add Contact Success', 402)
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
	searchUsername: async (req, res) => {
		const keyword = req.query.search;
		try {
			const result = await AuthModel.searchUsername(keyword);
			if(result.length >= 1){
				// delete result[0].password
				return response(res, true, result, 200);
			}
			return response(res, false, 'Not Found', 404);
		} catch (error) {
			console.log(error);
			return response(res, false, 'Internal Server Error', 500);
		}
	},
};
