module.exports = {
	sendMessage: 'INSERT INTO chats SET ?',
	getMessage: (receiver, sender) => {
		return `SELECT * , (SELECT name from users WHERE users.id = chats.user) AS senderName, (SELECT name from users WHERE users.id = chats.receiver) AS receiverName FROM chats WHERE chats.receiver = ${receiver} AND chats.user = ${sender} OR chats.receiver = ${sender} AND chats.user = ${receiver}`;
	},
	// getMyMessage: (me, id) => {
	// 	return `SELECT chats.sender, chats.receiver , (SELECT name from users WHERE users.id = chats.sender) AS senderName, (SELECT name from users WHERE users.id = chats.receiver) AS receiverName FROM chats WHERE chats.sender = ${me} AND chats.receiver = ${id} OR WHERE chats.receiver = ${me} AND chats.sender = ${id}`;
	// },
	// getMyMessage: (id) => {
	// 	return `SELECT chats._id, chats.user, users.name, users.image, users.latitude, users.longitude, chats.receiver, chats.message, chats.created_at FROM chats INNER JOIN users ON users.id=chats.user WHERE chats._id IN (SELECT MAX(_id) FROM chats WHERE chats.receiver = ${id} GROUP BY chats.user) ORDER BY chats.created_at DESC `;
	// },
	getMyMessage: (id) => {
		return `select m.*, users.name, users.image from chats m left join chats m1 on (((m.user = m1.user and m.receiver = m1.receiver) or (m.user = m1.receiver and m.receiver = m1.user ) ) and case when m.created_at = m1.created_at then m._id < m1._id else m.created_at < m1.created_at end ) INNER JOIN users on (m.user = users.id OR m.receiver = users.id) WHERE users.id != ${id} AND m1._id is null and ${id} in(m.user, m.receiver) ORDER BY created_at DESC`
	}
	// getMyMessage: (id) => {
	// 	return `select m.*, users.name, users.image from  chats m left join chats m1 on (((m.user = m1.user and m.receiver = m1.receiver) or (m.user = m1.receiver and m.receiver = m1.user ) ) and case when m.created_at = m1.created_at then m._id < m1._id else m.created_at < m1.created_at end ) INNER JOIN users on (m.user = users.id OR m.receiver = users.id AND users.id != ${id}) where m1._id is null and ${id} in(m.user, m.receiver) GROUP BY _id`
	// }
};
