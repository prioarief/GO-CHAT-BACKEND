const connection = require('../config/database');
const query = require('../helpers/query/auth');
module.exports = {
	Register: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.register, data, (error, result) => {
				if (error) {
					return reject(error);
				}

				const inserted = {
					id: result.insertId,
					...data,
				};
				resolve(inserted);
			});
		});
	},

	Login: (data) => { 
		return new Promise((resolve, reject) => {
			connection.query(query.getData('username', `'${data}'`), (error, result) => {
				if (error) {
					return reject(error);
				}

				resolve(result);
			});
		});
	},
	Myprofile: (id) => {
		return new Promise((resolve, reject) => {
			connection.query(query.getData('id', id), (error, result) => {
				if (error) {
					return reject(error);
				}

				resolve(result);
			});
		});
	},
	
	EditProfile: (id, data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.editData(id), data, (error, result) => {
				if (error) {
					return reject(error);
				}

				resolve(result);
			});
		});
	},
};
