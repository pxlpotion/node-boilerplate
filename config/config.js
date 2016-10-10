'use strict';

const path = require('path'),
      rootPath = path.normalize(__dirname + '/..'),
      env = process.env.NODE_ENV || 'development',
      appName = 'appName';

const config = {
  development: {
    env: 'development',
    root: rootPath,
    app: {
      name: appName,
      assets_path: '/build/src'
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
      assets_path: '/build/dist'
    },
    port: process.env.PORT,
    db: {
      MONGODB_URI: process.env.MONGODB_URI
    },
    redis: {
      REDIS_URL: process.env.REDIS_URL
    },
    logs: {
      LE_TOKEN: process.env.LE_TOKEN
    }
  },
  production: {
    env: 'production',
    root: rootPath,
    app: {
      name: appName,
      assets_path: '/build/dist'
    },
    port: process.env.PORT,
    db: {
      MONGODB_URI: process.env.MONGODB_URI
    },
    redis: {
      REDIS_URL: process.env.REDIS_URL
    },
    logs: {
      LE_TOKEN: process.env.LE_TOKEN
    }
  }
};

module.exports = config[env];
