"use strict";

import React from "react";
import { browserHistory } from 'react-router';

export default React.createClass({
  displayName: "SignIn",

  openModal() {
    browserHistory.push({
      pathname: window.location.pathname,
      query: { login: true }
    });
  },

  render() {
    return <a onClick={this.openModal}>autentifica aici</a>;
  }
});
