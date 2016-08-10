'use strict'

const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');

module.exports = function(app, config) {

  // Views
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // Body/Cookie Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());

  // Make Moment.js available to Jade
  app.locals.moment = require('moment');

  // Manage Req's and Res's
  app.use(compress());
  app.use(methodOverride());

  // Serve static assets
  app.use(express.static(config.root + '/public'));

  // Recursive loading will load all files in given path and all subdirectories
  const loadRecursively = function(path){
    fs.readdirSync(path).forEach(function (file) {
      if (file.indexOf('.js') >= 0) {
        require(path + '/' + file)(app, config);
      } else {
        loadRecursively(path + '/' + file);
      }
    });
  };

  // Load Middleware
  const middlewaresPath = path.join(__dirname, '../app/middlewares');
  loadRecursively(middlewaresPath);

  // Load Controllers
  const controllersPath = path.join(__dirname, '../app/controllers');
  loadRecursively(controllersPath);

};
