require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./src/config/database');
const route = require('./src/routes');

database.connect((err) => {
	if (err) throw err;
	console.log('Database Connected');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(route);

app.get('*', (req, res) => {
	res.status(404).send('Not found');
});

app.listen(process.env.APP_PORT, () =>
	console.log(`Server running on port ${process.env.APP_PORT}`)
);
