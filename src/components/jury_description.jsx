"use strict";

import React from "react";
import { Row, Col } from "react-bootstrap";


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
      <Col md={12} className="jury-members">
        {this.props.members.map(function(member) {
          return <div className="jury-member">
            <div className="jury-avatar"><img src={member.avatar} /></div>
            <div className="jury-name">{member.name}</div>
            <div className="jury-occupation">{member.occupation}</div>
          </div>;
        })}
      </Col>
    </Row>;
  }
});
