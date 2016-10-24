'use strict';

// Gulp Config
const returnConfig = function(mode) {
  let dir = mode === 'build' ? 'dist' : 'src';
  let path = {
    dest: `build/${dir}`,
    entry_point: `app/client`
  };
  let config = {
    path: path,
    img: {
      entry_point: `${path.entry_point}/images`
    },
    js: {
      out: 'bundle.js',
      entry_point: `${path.entry_point}/main.js`
    },
    sass: {
      out: 'style.css',
      entry_point: `${path.entry_point}/main.scss`
    }
  };
  return config;
};

module.exports = returnConfig;
