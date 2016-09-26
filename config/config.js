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
    port: 3000,
    db: {
      MONGODB_URI: process.env.SIXTHMAN_MONGODB_URI
    },
    redis: {
      REDIS_URL: process.env.SIXTHMAN_REDIS_URL
    },
    logs: {
      LE_TOKEN: process.env.SIXTHMAN_LE_TOKEN
    }
  },
  staging: {
    env: 'staging',
    root: rootPath,
    app: {
      name: appname
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
        name: appname
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
