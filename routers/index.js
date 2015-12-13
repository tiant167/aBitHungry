'use strict';
let router = require('koa-router')();

let rootRouter = require('./root');
let recipeRouter = require('./recipe');
let validate = require('../utils/validate');

router.prefix('/v2');

router.get('/', rootRouter.root);

router.get('/recipes/list', recipeRouter.filterByLabel);
router.get('/recipes/:id', validate.isObjectId('id'), recipeRouter.getById);

module.exports = router;
