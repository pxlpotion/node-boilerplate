'use strict'

const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'local';

const config = {
  local: {  // DEFAULT : for running on local machine
    env: 'local_dev',
    root: rootPath,
    app: {
      name: 'app-name'
    },
    port: 3000
  },
  development: {
    env: 'development',
    root: rootPath,
    app: {
      name: 'app-name'
    },
    port: 3000
  },
  test: {
    env: 'test',
    root: rootPath,
    app: {
      name: 'app-name'
    },
    port: 3000
  },
  production: {
    env: 'production',
    root: rootPath,
    app: {
        name: 'app-name'
    },
    port: 3000
  }
};

module.exports = config[env];
