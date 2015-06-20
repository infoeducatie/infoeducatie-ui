"use strict";

import { Row, Col, Glyphicon } from "react-bootstrap";
import React from "react";


export default React.createClass({
  displayName: "Project",

  render() {

    var className = "orange-section " + this.props.category;

    return <div className="item">
      <div className="participant-container">
        <Row className="big-spacing"></Row>
        <Row className="project-title">{this.props.title}</Row>
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
              utilitar
            </Col>
          </Row>
        </Col>
      </Row>
    </div>;
  }
});
