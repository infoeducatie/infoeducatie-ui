"use strict";

import React from "react";

import ctx from "classnames";
import { Grid, Row, Col } from "react-bootstrap";

import "../../main.less";


export default React.createClass({
  displayName: "ProjectCard",

  openDiscourse(discourse_url) {
    window.open(discourse_url, "_blank");
  },

  render() {
    let projectCategoryIconClasses = ctx(
        "project-category-icon", "section-icon", this.props.project.category);

    return <div className="project-card"
                onClick={this.openDiscourse.bind(this, this.props.project.discourse_url)}>
      <div className="participant-container">
        <Row className="xsmall-spacing" />
        <Row className="project-title">
          <Col xs={12}>
            <h4>
                {this.props.project.title}
            </h4>
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row className="project-details">
          <Col xs={12}>
            <ul className="list-unstyled">
              {this.props.project.contestants.map(function(contestant) {
                return <li className="author" key={contestant.id}>
                  {contestant.name}
                </li>;
              })}
            </ul>
            <Row className="xsmall-spacing" />
            <Row>
              <Col xs={1}>
                <span className='map-marker' />
              </Col>
              <Col xs={6}>
                <p>{this.props.project.county}</p>
              </Col>
              <Col xs={1} xsOffset={2}>
                <span className="comments">
                  {this.props.project.comments_count}
                </span>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
      </div>
      <Row className="orange-section">
        <Col xs={12}>
          <Row className="xxsmall-spacing" />
          <Row>
            <Col sm={8}>
              <p className="project-category">
                {this.props.project.category_slug}
              </p>
            </Col>
            <Col sm={4}>
              <p><span className={projectCategoryIconClasses} /></p>
            </Col>
          </Row>
          <Row className="xxsmall-spacing" />
        </Col>
      </Row>
      <Row className="xsmall-spacing" />
    </div>;
  }
});
