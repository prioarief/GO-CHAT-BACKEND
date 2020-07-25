module.exports = {
	sendMessage: 'INSERT INTO chats SET ?',
	getMessage: (receiver, sender) => {
		return `SELECT * , (SELECT name from users WHERE users.id = chats.sender) AS senderName, (SELECT name from users WHERE users.id = chats.receiver) AS receiverName FROM chats WHERE chats.receiver = ${receiver} OR chats.sender = ${receiver} AND chats.receiver = ${sender} OR chats.sender = ${sender}`;
	},
	getMyMessage: (id) => {
		return `SELECT chats.sender, chats.receiver , (SELECT name from users WHERE users.id = chats.sender) AS senderName, (SELECT name from users WHERE users.id = chats.receiver) AS receiverName FROM chats`;
	},
};
