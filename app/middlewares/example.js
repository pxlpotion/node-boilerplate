// This file should be deleted or renamed/refactored

'use strict'

module.exports = function (app) {

  app.use(function(req, res, next) {
    console.log('I am a middleware process on each request.');
    next();
  });

};
