'use strict';

let _ = require('lodash');

let errorsTable = require('./errorsTable');

module.exports = class Err {
  constructor(errorName, payload) {
    payload = payload || {};
    this.error = errorsTable[errorName] || errorsTable.DefaultError;
    this.error = _.assign(this.error, payload);
  }
};
