const connection = require('../config/database');
module.exports = {
	Register: (data) => {
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO users SET ?', data, (error, result) => {
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
};
