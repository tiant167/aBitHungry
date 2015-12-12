'use strict';
let router = require('koa-router')();

let rootRouter = require('./root');
let recipeRouter = require('./recipe');

router.prefix('/v2');

router.get('/', rootRouter.root);

router.get('/recipes/list', recipeRouter.filterByLabel);

module.exports = router;
