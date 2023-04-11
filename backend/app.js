const express = require('express');
const bodyParser = require('body-parser');

const placeRouter = require('./routes/placeRoute');

const app = express();

app.use('/api/v1/place', placeRouter);

module.exports = app;