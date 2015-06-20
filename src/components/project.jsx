"use strict";

import { Row, Col, Glyphicon } from "react-bootstrap";
import React from "react";


export default React.createClass({
  displayName: "Project",

  render() {

    var categoryMapping = {
      "utilitar": "utility",
      "roboți": "robots",
      "multimedia": "media",
      "educațional": "educational",
      "web": "web"
    };
    var className = "orange-section " + categoryMapping[this.props.category];

    return <div className="item">
      <div className="participant-container">
        <Row className="big-spacing"></Row>
        <Row className="project-title">
          <Col md={10} mdOffset={1}>
            {this.props.title}
          </Col>
        </Row>
        <Row className="big-spacing"></Row>
        <Row className="project-details">
          <Col md={12}>
            {this.props.authors.map(function(author) {
                return <div className="author">{author}</div>;
              })}
            <Row className="large-spacing"></Row>
            <Row>
              <Col md={1}>
                <Glyphicon inverse glyph='map-marker' className="icon" />
              </Col>
              <Col md={6}>
                {this.props.county}
              </Col>
              <Col md={1} mdOffset={2}>
                {this.props.comments}
              </Col>
            </Row>
            <Row className="big-spacing"></Row>
          </Col>
        </Row>
      </div>
      <Row className={className}>
        <Col md={12} >
          <Row className="big-spacing"></Row>
          <Row>
            <Col md={4} mdOffset={1}>
              {this.props.category}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>;
  }
});
