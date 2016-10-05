const $ = require('jquery'),
      domRouter = require('./scripts/dom-router.js');

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match ("about" for example). If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 * ======================================================================== */
const pxlPotion = {
  // All pages
  'common': {
    init: function() {
      // Import a module from another file
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

// Load Events
const router = domRouter(pxlPotion);
$(document).ready(router.loadEvents);
