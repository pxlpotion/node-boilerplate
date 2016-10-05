const $ = require('jquery'),
      domRouter = require('./scripts/dom-router.js');

const pxlPotion = {
  // All pages
  'common': {
    init: function() {
      // Import an example module from another file
      require('./scripts/example.js');
    },
    finalize: function() {}
  },
  'about': {
    init: function() {
    },
    finalize: function() {}
  }
};

// Load Events (see ./scripts/dom-router.js for more info on how this works)
const router = domRouter(pxlPotion);
$(document).ready(router.loadEvents);
