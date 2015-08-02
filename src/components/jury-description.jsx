"use strict";

import ctx from "classnames";
import React from "react";
import { Row, Col } from "react-bootstrap";


export default React.createClass({
  displayName: "JuryDescription",
  render() {
    let juryIcon = null;
    if (this.props.iconClass) {
      let juryIconClass = ctx("section-icon", this.props.iconClass);
      juryIcon = (
        <div className="jury-icon">
          <span className={juryIconClass} />
        </div>
      );
    }

    return <div className="jury-description-wrapper">
      {juryIcon}
      <div className="jury-description">
        <span className="orange-dash">&mdash;</span>
          {this.props.name}
        <span className="orange-dash">&mdash;</span>
      </div>
      <Col className="jury-members">
        {this.props.members.map(function(member) {
          return <div className="jury-member" key={member.name}>
            <div className="jury-avatar"><img src={member.avatar} /></div>
            <div className="jury-name">{member.name}</div>
            <div className="jury-occupation">{member.occupation}</div>
          </div>;
        })}
      </Col>
    </div>;
  }
});
