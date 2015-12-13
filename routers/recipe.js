'use strict';

let _ = require('lodash');

let genres = require('../utils/genres');
let RecipeService = require('../services/recipe');

let recipeRouter = module.exports = {};

recipeRouter.filterByLabel = function*() {
  let labelEngNames = !_.isUndefined(this.query.labels) ? this.query.labels.split(',') : [];
  let options = {
    lastId: this.query.lastId,
    limit: this.query.limit || 20,
    select: {
      author: 1,
      img: 1,
      title: 1,
      duration: 1,
      calories: 1,
      labels: 1,
      collectionCount: 1,
      commentCount: 1
    }
  };
  let recipes = yield RecipeService.getRecipesByLabelsAsync(labelEngNames, options);
  this.body = genres.success(recipes);
};

recipeRouter.getById = function*() {
  let id = this.params.id;
  let recipe = yield RecipeService.getRecipeByIdAsync(id);
  this.body = genres.success(recipe);
};
