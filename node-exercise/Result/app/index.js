const express = require('express');
const bodyParser = require('body-parser');
const nocache = require('nocache');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(nocache());
app.use(cors());

app.use('/people', require('./routes/people'));
app.use('/planets', require('./routes/planets'));

module.exports = app;
