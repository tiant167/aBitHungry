'use strict';

let genres = require('./genres');
let Err = require('../errors');
let validate = module.exports = {};

validate.isObjectId = function(paramName){
  return function*(next){
    if (/[0-9a-f]{24}/.test(this.params[paramName])){
      yield next;
    } else {
      let error = new Err('ParamsError');
      this.body = genres.error(error.error);
      this.status = error.error.statusCode;
    }
  };
};
