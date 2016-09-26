'use strict'

const express = require('express');
const config = require('./config/config.js');
const app = express();

// Configure Express
require('./config/express')(app, config);

// Start the server
const server = app.listen(config.port, () => {
  console.log(`${config.app.name} listening on PORT : ${config.port}`);
});

// Exception handling
process.on('uncaughtException', function(err) {
  console.error(err);
  server.close(function(){
    process.exit(1);
  });
});
