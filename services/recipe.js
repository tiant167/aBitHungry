'use strict';

let _ = require('lodash');

let Recipe = require('../db').Recipe;

let RecipeService = module.exports = {};

RecipeService.getRecipesByLabelsAsync = function(labelEngNames, options) {
  options = options || {};
  let query = {
    stateValue: { $gte: 0 }
  };
  let isPopuateAuthor = true;
  if (!_.isEmpty(labelEngNames)){
    // if empty find all
    query['labels.engName'] = { $in: labelEngNames };
  }

  if (!_.isUndefined(options.lastId)) {
    query._id = { $gt: options.lastId };
  }

  let executeQuery = Recipe.find(query);

  if (!_.isUndefined(options.select)) {
    executeQuery = executeQuery.select(options.select);
    if (!_.contains(_.keys(options.select), 'author')){
      isPopuateAuthor = false;
    }
  }
  if (!_.isUndefined(options.limit)) {
    executeQuery = executeQuery.limit(options.limit);
  }
  if (isPopuateAuthor){
    executeQuery = executeQuery.populate('author', 'avatar nickName sex');
  }
  return executeQuery.lean().exec();
};

RecipeService.getRecipeByIdAsync = function(id, options) {
  options = options || {};
  let isPopuateAuthor = true;
  let executeQuery = Recipe.findOne({ _id: id });
  if (!_.isUndefined(options.select)) {
    executeQuery = executeQuery.select(options.select);
    if (!_.contains(_.keys(options.select), 'author')){
      isPopuateAuthor = false;
    }
  }
  return executeQuery.lean().exec();
};
