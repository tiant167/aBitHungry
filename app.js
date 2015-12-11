'use strict';
var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('short'));

app.use('/v2', require('./routers/v2'));

module.exports = app;
