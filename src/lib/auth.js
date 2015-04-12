"use strict";

/**
 * Minimal authentication system.
 */
window.user = JSON.parse(window.localStorage.getItem('user')) || false;
let Auth = {
  isLoggedIn() {
    return window.user;
  },
  onChange() { },
  login(user = true) {
    window.user = user;
    window.localStorage.setItem('user', JSON.stringify(user));
    this.onChange();
  },
  logout() {
    window.user = false;
    window.localStorage.setItem('user', false);
    this.onChange();
  }
};

window.Auth = Auth;
export default Auth;
