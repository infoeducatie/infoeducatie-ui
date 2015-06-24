"use strict";

import { Row, Col, Glyphicon } from "react-bootstrap";
import React from "react";


export default React.createClass({
  displayName: "ProjectRow",

  render() {
    var className = "project-category-icon section-icon " + this.props.project.category;

    return <div className="item">
      <div className="participant-container">
        <Row className="xsmall-spacing"></Row>
        <Row className="project-title">
          <Col md={10} mdOffset={1}>
            {this.props.project.title}
          </Col>
        </Row>
        <Row className="xsmall-spacing"></Row>
        <Row className="project-details">
          <Col md={12}>
            {this.props.project.authors.map(function(author) {
                return <div className="author">{author}</div>;
            })}
            <Row className="xsmall-spacing"></Row>
            <Row>
              <Col md={1}> <span className='map-marker' /> </Col>
              <Col md={6}> {this.props.project.county} </Col>
              <Col md={1} mdOffset={2}>
                <span className="comments"> {this.props.project.comments} </span>
              </Col>
            </Row>
            <Row className="xsmall-spacing"></Row>
          </Col>
        </Row>
      </div>
      <Row className="orange-section">
        <span className="project-category">{this.props.project.category_slug}</span>
        <span className={className} />
      </Row>
    </div>;
  }
});
