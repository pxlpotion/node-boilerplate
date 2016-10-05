'use strict';

// This file should be deleted or renamed/refactored

module.exports = (app) => {

  app.use((req, res, next) => {
    console.log('I am a middleware process on each request.');
    next();
  });

};
