"use strict";

/**
 * Minimal authentication system.
 */
window.user = false;
let Auth = {
  isLoggedIn() {
    return window.user;
  },
  onChange() { },
  login(user = true) {
    window.user = user;
    this.onChange();
  },
  logout() {
    window.user = false;
    this.onChange();
  }
};

window.Auth = Auth;
export default Auth;
