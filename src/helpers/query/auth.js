module.exports = {
	register: 'INSERT INTO users SET ?',
	getData: (key, value) => {
		return `SELECT * FROM users WHERE ${key} = ${value}`;
	},
	editData: (id) => {
		return `UPDATE users SET ? WHERE id = ${id} `;
	},
};
