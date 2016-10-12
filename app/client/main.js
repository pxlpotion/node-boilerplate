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
  'example': {
    init: function() {
      console.log('I am only fired on a page with "example" as a class on the body, which is passed to Pug via the controller and "routerClass". See app/server/controllers/example.js and app/server/views/layouts/base.pug');
    },
    finalize: function() {}
  }
};

// Load Events (see ./scripts/dom-router.js for more info on how this works)
const router = domRouter(pxlPotion);
$(document).ready(router.loadEvents);
