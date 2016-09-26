'use strict'

const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'local';
const appname = '6th Man Movers'

const config = {
  development: {
    env: 'development',
    root: rootPath,
    app: {
      name: appname
    },
    port: 3000
  },
  staging: {
    env: 'staging',
    root: rootPath,
    app: {
      name: appname
    },
    port: process.env.PORT
  },
  production: {
    env: 'production',
    root: rootPath,
    app: {
        name: appname
    },
    port: process.env.PORT
  }
};

module.exports = config[env];
