const $ = require('jquery');

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match ("about" for example). If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 * ======================================================================== */

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
const domRouter = (namespace) => {
  const methods = {
    fire: function(func, funcname, args) {
      let fire;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      methods.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        methods.fire(classnm);
        methods.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      methods.fire('common', 'finalize');
    }
  };
  return methods;
};
