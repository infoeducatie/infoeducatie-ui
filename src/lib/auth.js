"use strict";

/**
 * Minimal authentication system.
 */
window.user = false;
window.auth = {
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
