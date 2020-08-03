const jwt = require('jsonwebtoken');
// const createToken = require("../middleware/createToken");
module.exports = (req, res, next) => {
	let token = null;
	try {
		token = req.headers.authorization;
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.decoded = decoded;
		next();
	} catch (error) {
		if (error.name == 'TokenExpiredError') {
			// const payload = jwt.verify(token, process.env.JWT_KEY, {
			// 	ignoreExpiration: true,
			// });
			// console.log(payload);
			// const refreshToken = createToken.createToken(payload.result[0], process.env.JWT_KEY, "1m" )
			return res.status(401).json({
				message: 'Invalid Token',
			});
		}
		return res.status(401).json({
			message: 'Invalid Token',
		});
	}
};
