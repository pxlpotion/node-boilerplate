'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');

module.exports = (app, config) => {

  // Favicon
  // NOTE: Without this browsers may make two requests, an additional to /favicon.ico
  // NOTE: Module stores file in memory, so just get it from the build/dist dir
  app.use(favicon('build/dist/images/favicon.png'));

  // Views
  app.set('views', config.root + '/app/server/views');
  app.set('view engine', 'pug');

  // Body/Cookie Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());

  // Make some stuff available to Jade
  app.locals.moment = require('moment');

  // Manage Req's and Res's
  app.use(compress());
  app.use(methodOverride());

  // Serve static assets
  app.use(express.static(config.root + config.app.assets_path));

  // Recursive loading will load all files in given path and all subdirectories
  const loadRecursively = (path) => {
    fs.readdirSync(path).forEach((file) => {
      if (file.indexOf('.js') >= 0) {
        require(path + '/' + file)(app, config);
      } else {
        loadRecursively(path + '/' + file);
      }
    });
  };

  // Load Middleware
  const middlewaresPath = path.join(__dirname, '../app/server/middlewares');
  loadRecursively(middlewaresPath);

  // Load Controllers
  const controllersPath = path.join(__dirname, '../app/server/controllers');
  loadRecursively(controllersPath);

};
