'use strict';

let config = require('config');
let koa = require('koa');
let logger = require('koa-logger');

let app = koa();

app.use(logger());
app.use(require('./routers').routes());

app.listen(config.get('port'), config.get('host'));
console.log('app running on %s:%s', config.get('host'), config.get('port'));
