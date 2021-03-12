const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get("/", function (req, res) {
	console.log('Server no ar');
	res.end('Server no ar');
});

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
	next();
});

app.options('*', function (req, res, next) {
	res.end();
});

app.use('/timetables', require('../routes/timetablesRoute'));
app.use('/classes', require('../routes/classesRoute'));
app.use('/institutions/:idInstitution/users/:idUser/reviews', require('routes/institutionsUsersReviewsRoute'));

module.exports = app;
