// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
"use strict";

/**
 * Check if user is authenticate, or redirect him to /.
 */
export default {
  statics: {
    willTransitionTo: function(transition) {
      var nextPath = transition.path;
      if (!window.Auth.isLoggedIn()) {
        transition.redirect("/", {},
          {"nextPath": nextPath});
      }
    }
  }
};
