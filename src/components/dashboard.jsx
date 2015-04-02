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
