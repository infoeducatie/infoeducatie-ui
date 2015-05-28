// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
"use strict";

import React from "react";
import { Row } from "react-bootstrap";

export default React.createClass({
  displayName: "JuryDescription",
  render() {
    var className = "jury-" + this.props.iconClass;
    return <Row className="white-section">
      <div className="jury-icon"><span className={className}></span></div>
      <div className="jury-description">
        <span className="orange-dash">&mdash;</span>
          {this.props.name}
        <span className="orange-dash">&mdash;</span>
      </div>
    </Row>
  }
});
