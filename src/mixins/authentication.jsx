/**
 * Check if user is authenticate, or redirect him to /.
 */
export default {
  statics: {
    willTransitionTo: function(transition) {
      var nextPath = transition.path;
      if (!auth.loggedIn()) {
        transition.redirect('/', {},
          { 'nextPath' : nextPath });
      }
    }
  }
};
