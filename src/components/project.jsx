"use strict";

import { Row, Col, Glyphicon } from "react-bootstrap";
import React from "react";


export var ProjectCard = React.createClass({
  displayName: "Project",

  render() {
    var className = "project-category-icon section-icon " + this.props.category;

    return <div className="item">
      <div className="participant-container">
        <Row className="xsmall-spacing"></Row>
        <Row className="project-title">
          <Col md={10} mdOffset={1}>
            {this.props.title}
          </Col>
        </Row>
        <Row className="xsmall-spacing"></Row>
        <Row className="project-details">
          <Col md={12}>
            {this.props.authors.map(function(author) {
                return <div className="author">{author}</div>;
            })}
            <Row className="xsmall-spacing"></Row>
            <Row>
              <Col md={1}> <span className='map-marker' /> </Col>
              <Col md={6}> {this.props.county} </Col>
              <Col md={1} mdOffset={2}>
                <span className="comments"> {this.props.comments} </span>
              </Col>
            </Row>
            <Row className="xsmall-spacing"></Row>
          </Col>
        </Row>
      </div>
      <Row className="orange-section">
        <span className="project-category">{this.props.slug}</span>
        <span className={className} />
      </Row>
    </div>;
  }
});

export var ProjectRow = React.createClass({
  displayName: "Project",

  render() {
    var className = "project-category-icon section-icon " + this.props.category;

    return <Row>
      <Col md={12}>
        <Row className="project-row">
          <Col md={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col md={9} className="project-details">
                <span className="project-title">{this.props.title}</span>
                <div className="authors">
                  {this.props.authors.map(function(author) {
                    return <span className="author">{author}</span>;
                  })}
                </div>
              </Col>
              <Col md={2}>
                <div className="project-other-details">
                  <span className="map-marker" />
                  <span className="location">{this.props.county}</span>
                  <span className="comments">{this.props.comments}</span>
                </div>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
        <Row className="orange-section">
          <span className="project-category">{this.props.slug}</span>
          <span className={className} />
        </Row>
      </Col>
    </Row>;
  }
});
