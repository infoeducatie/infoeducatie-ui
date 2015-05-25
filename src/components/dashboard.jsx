// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
"use strict";

import React from "react";

import Authentication from "../mixins/authentication.jsx"


export default React.createClass({
  mixins: [Authentication],

  displayName: "Dashboard",

  render() {
    return <div>
      <h1>Dashboard</h1>
    </div>;
  }
});
