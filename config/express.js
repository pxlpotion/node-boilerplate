'use strict';

const express = require('express'),
      fs = require('fs'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      compress = require('compression'),
      methodOverride = require('method-override'),
      favicon = require('serve-favicon');

module.exports = (app, config) => {

  // Favicon & Static files
  // NOTE: This is where/how files are served from the diff build dirs for dev/prod
  let assetsPath = config.root + config.app.assets_path;
  app.use(express.static(assetsPath));
  app.use(favicon(assetsPath + '/images/favicon.ico'));

  // Views
  app.set('views', config.root + '/app/server/views');
  app.set('view engine', 'pug');

  // Body/Cookie Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());

  // Make some stuff available to Pug
  app.locals.moment = require('moment');
  app.locals.env = config.env;

  // Manage Req's and Res's
  app.use(compress());
  app.use(methodOverride());

  // Recursive loading will load all files in given path and all subdirectories
  const loadRecursively = (path, app, config) => {
    fs.readdirSync(path).forEach((file) => {
      if (file.indexOf('.js') >= 0) {
        require(path + '/' + file)(app, config);
      } else {
        loadRecursively(path + '/' + file, app, config);
      }
    });
  };

  // Load Middleware
  const middlewaresPath = path.join(__dirname, '../app/server/middlewares');
  loadRecursively(middlewaresPath, app, config);

  // Load Controllers
  const controllersPath = path.join(__dirname, '../app/server/controllers');
  loadRecursively(controllersPath, app, config);

};
