"use strict";

import React from "react";

import ctx from "classnames";
import { Grid, Row, Col } from "react-bootstrap";

import "./project_card.less";


export default React.createClass({
  displayName: "ProjectCard",

  render() {
    let projectCategoryIconClasses = ctx(
        "project-category-icon", "section-icon", this.props.project.category);

    return <div className="project-card">
      <div className="participant-container">
        <Row className="xsmall-spacing" />
        <Row className="project-title">
          <Col xs={12}>
            <h4>
              <a href={this.props.project.forum_link} target="_blank">
                {this.props.project.title}
              </a>
            </h4>
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row className="project-details">
          <Col xs={12}>
            <ul className="list-unstyled">
              {this.props.project.authors.map(function(author) {
                return <li className="author" key={author.id}>
                  {author.name}
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
                  {this.props.project.comments}
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
