"use strict";

import React from "react";
import { Row, Col } from "react-bootstrap";


export default React.createClass({
  displayName: "JuryDescription",
  render() {
    return <Row className="white-section">
      <div className="jury-icon"><span className={this.props.iconClass}></span></div>
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
