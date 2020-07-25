const connection = require('../config/database');
const query = require('../helpers/query/message');
module.exports = {
	SendMessage: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.sendMessage, data, (error, result) => {
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

	getMessage: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.getMessage(data.receiver, data.sender), (error, result) => {
				if (error) {
					reject(error);
				}

				resolve(result);
			});
		});
	},
	getMyMessage: (id) => {
		return new Promise((resolve, reject) => {
			connection.query(query.getMyMessage(id), (error, result) => {
				if (error) {
					reject(error);
				}

				resolve(result);
			});
		});
	},
};
