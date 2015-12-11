'use strict';

var config = require('config');
var app = require('./app');

var server = app.listen(config.get('port'), config.get('host'), function () {
  console.log('app running on %s', server.address().port);
});

process.once('SIGTERM', function() {
  server.close(function() {
    console.log('service is shut down.');
    process.exit(0);
  });
});

console.log('pid', process.pid);
