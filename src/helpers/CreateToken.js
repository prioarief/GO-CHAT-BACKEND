const jwt = require('jsonwebtoken');

module.exports = {
	createToken: (data, key) => {
		const token = jwt.sign(
			{
				result: data,
			},
			key,
		);
		return token;
	},
};
