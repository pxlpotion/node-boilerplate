'use strict';

const path = require('path'),
      rootPath = path.normalize(__dirname + '/..'),
      env = process.env.NODE_ENV || 'development',
      packageJSON = require('../package.json'),
      appName = packageJSON.name;

const config = {
  development: {
    env: 'development',
    root: rootPath,
    app: {
      name: appName,
      assets_path: '/build/src',
      main: packageJSON.main
    },
    port: 3000,
    db: {
      MONGODB_URI: process.env[appName + '_MONGODB_URI']
    },
    redis: {
      REDIS_URL: process.env[appName + '_REDIS_URL']
    },
    logs: {
      LE_TOKEN: process.env[appName + '_LE_TOKEN']
    }
  },
  staging: {
    env: 'staging',
    root: rootPath,
    app: {
      name: appName,
      assets_path: '/build/dist',
      main: packageJSON.main
    },
    port: process.env.PORT,
    db: {
      MONGODB_URI: process.env[appName + '_MONGODB_URI']
    },
    redis: {
      REDIS_URL: process.env[appName + '_REDIS_URL']
    },
    logs: {
      LE_TOKEN: process.env[appName + '_LE_TOKEN']
    }
  },
  production: {
    env: 'production',
    root: rootPath,
    app: {
      name: appName,
      assets_path: '/build/dist',
      main: packageJSON.main
    },
    port: process.env.PORT,
    db: {
      MONGODB_URI: process.env[appName + '_MONGODB_URI']
    },
    redis: {
      REDIS_URL: process.env[appName + '_REDIS_URL']
    },
    logs: {
      LE_TOKEN: process.env[appName + '_LE_TOKEN']
    }
  }
};

module.exports = config[env];
