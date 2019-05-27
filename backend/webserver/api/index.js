'use strict';

const express = require('express');

module.exports = function(dependencies, lib) {

  const router = express.Router();

  require('./deleted-messages')(dependencies, lib, router);

  return router;
};
