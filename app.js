'use strict';

const express = require('express'),
			app = express(),
      fs = require('fs'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      compress = require('compression'),
      methodOverride = require('method-override'),
      favicon = require('serve-favicon'),
			config = require('./config/config');

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
const loadRecursively = (path, router) => {
	fs.readdirSync(path).forEach((file) => {
		if (file.indexOf('.js') >= 0) {
			require(path + '/' + file)(router);
		} else {
			loadRecursively(path + '/' + file, router);
		}
	});
};

// Init and app.use the router, then load middlewares and controllers
// NOTE: Additional routers can/should be created for different needs.
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
const router = express.Router();
app.use('/', router);

// Load Middleware
const middlewaresPath = config.root + '/app/server/middlewares';
loadRecursively(middlewaresPath, router);

// Load Controllers
const controllersPath = config.root + '/app/server/controllers';
loadRecursively(controllersPath, router);

// Start the server
const server = app.listen(config.port, () => {
	console.log(`${config.app.name} listening on PORT : ${config.port}`);
});

// Exception handling
process.on('uncaughtException', (err) => {
	console.error(err);
	server.close(() => {
		process.exit(1);
	});
});

