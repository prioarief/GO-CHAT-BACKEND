require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./src/config/database');
const route = require('./src/routes');

database.connect((err) => {
	if (err) throw err;
	console.log('Database Connected');
});

io.on('connection', (socket) => {
	console.log('user connected');
	socket.on('chat message', (msg) => {
		console.log(msg);
	});
	socket.on('disconnect', () => {
		console.log('disconnect');
	});
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
	req.io = io;
	next();
  })
app.use('/images', express.static('src/images'));
app.use(route);



app.get('*', (req, res) => {
	res.status(404).send('Not found');
});

server.listen(process.env.APP_PORT, () =>
	console.log(`Server running on port ${process.env.APP_PORT}`)
);
