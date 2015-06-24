"use strict";

import React from "react";

import ctx from "classnames";
import { Grid, Row, Col } from "react-bootstrap";

import "./project_card.less";


export default React.createClass({
  displayName: "ProjectCard",

  render() {
    let className = ctx("project-category-icon", "section-icon",
                        this.props.project.category);

    return <div className="project-card">
      <div className="participant-container">
        <Row className="xsmall-spacing" />
        <Row className="project-title">
          <Col md={10} mdOffset={1}>
            <p>{this.props.project.title}</p>
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row className="project-details">
          <Col>
            {this.props.project.authors.map(function(author) {
              return <p className="author" key={author.id}>
                {author.name}
              </p>;
            })}
            <Row className="xsmall-spacing" />
            <Row>
              <Col md={1}>
                <span className='map-marker' />
              </Col>
              <Col md={6}>
                <p>{this.props.project.county}</p>
              </Col>
              <Col md={1} mdOffset={2}>
                <span className="comments">
                  {this.props.project.comments}
                </span>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
      </div>
      <Row className="orange-section">
        <Col md={8} className="project-category">
          <p>{this.props.project.category_slug}</p>
        </Col>
        <Col md={4} className={className} />
      </Row>
    </div>;
  }
});
