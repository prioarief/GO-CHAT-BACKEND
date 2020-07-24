const jwt = require('jsonwebtoken');

module.exports = {
	createToken: (data, key, expired) => {
		const token = jwt.sign(
			{
				result: data,
			},
			key,
			{
				expiresIn: expired,
			}
		);
		return token;
	},
};
