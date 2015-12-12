'use strict';

let _ = require('lodash');
let project = require('../package');

function responseSuccess(content, meta) {
  let data = content;

  meta = meta || {};

  return _.extend({
    ok: true,
    data: data,
    errorCode: 0,
    now: new Date(),
    version: project.version
  }, meta);
}

function responseError(err) {
  let data = err.message;
  let errorCode = err.errorCode;
  let text = err.text;

  return {
    ok: false,
    data: data,
    errorCode: errorCode,
    text: text,
    now: new Date(),
    version: project.version
  };
}

exports = module.exports = {
  success: function (resp) {
    return responseSuccess(resp);
  },
  error: function (err) {
    return responseError(err);
  }
};
