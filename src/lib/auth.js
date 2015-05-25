// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
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
