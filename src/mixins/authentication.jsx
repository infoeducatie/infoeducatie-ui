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
