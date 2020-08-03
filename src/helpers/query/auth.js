module.exports = {
	register: 'INSERT INTO users SET ?',
	addContact: 'INSERT INTO contact SET ?',
	searchContact: (key) => {
		return `SELECT id, name, username, image FROM users where username LIKE '%${key}%' `
	},
	getContact: 'SELECT id , (SELECT name from users WHERE users.id = contact.friend_id) AS friendName, (SELECT image from users WHERE users.id = contact.friend_id) AS friendImage, (SELECT id from users WHERE users.id = contact.friend_id) AS idFriend, (SELECT longitude from users WHERE users.id = contact.friend_id) AS longitude, (SELECT latitude from users WHERE users.id = contact.friend_id) AS latitude FROM contact WHERE contact.user_id = ? ORDER BY friendName ASC',
	getData: (key, value) => {
		return `SELECT * FROM users WHERE ${key} = ${value}`;
	},
	editData: (id) => {
		return `UPDATE users SET ? WHERE id = ${id} `;
	},
};
