'use strict';

let genres = require('../utils/genres');

let rootRouter = module.exports = {};

rootRouter.root = function*(next){
  this.body = genres.success('aBitHungry');
  yield next;
};
