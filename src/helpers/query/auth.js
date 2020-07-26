module.exports = {
	register: 'INSERT INTO users SET ?',
	getData: (key, value) => {
		return `SELECT * FROM users WHERE ${key} = ${value} `;
	},
};
