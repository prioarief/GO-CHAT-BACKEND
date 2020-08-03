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

	AddContact: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.addContact, data, (error, result) => {
				if (error) {
					return reject(error);
				}

				resolve(result);
			});
		});
	},
	
	getContact: (id) => {
		return new Promise((resolve, reject) => {
			connection.query(query.getContact, id, (error, result) => {
				if (error) {
					return reject(error);
				}

				resolve(result);
			});
		});
	},
	
	searchUsername: (key) => {
		return new Promise((resolve, reject) => {
			connection.query(query.searchContact(key), (error, result) => {
				if (error) {
					return reject(error);
				}
				
				resolve(result);
			});
		});
	}
};
