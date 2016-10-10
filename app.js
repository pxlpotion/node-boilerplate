'use strict';

const express = require('express'),
      config = require('./config/config'),
      app = express();

// Configure Express
require('./config/express')(app, config);

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
