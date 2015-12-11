'use strict';

// Global dependencies
var express = require('express');

// Local dependencies
var genres = require('../../utils/genres.js');
var router = express.Router();

// Expose router
module.exports = router;

router.get('', function (req, res) {
  res.send(genres.success('aBitHungry'));
});
