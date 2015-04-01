import React from "react";

import Authentication from "../mixins/authentication.jsx"

export default React.createClass({
  mixins: [Authentication],

  render: function() {
    return <div>
      <h1>Dashboard</h1>
    </div>;
  }
});
