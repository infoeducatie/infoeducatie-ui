"use strict";

/**
 * Minimal authentication system.
 */
window.user = false;
let Auth = {
  loggedIn() {
    return window.user;
  },
  onChange() { },
  login() {
    window.user = true;
    this.onChange();
  },
  logout() {
    window.user = false;
    this.onChange();
  }
};

window.Auth = Auth;
export default Auth;
