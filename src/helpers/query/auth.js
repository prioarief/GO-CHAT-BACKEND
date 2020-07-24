module.exports = {
	register: 'INSERT INTO users SET ?',
	login: 'SELECT * FROM users WHERE username = ? ',
};
