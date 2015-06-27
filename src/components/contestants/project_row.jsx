"use strict";

import React from "react";

import ctx from "classnames";
import { Row, Col } from "react-bootstrap";

import "./project_row.less";


export default React.createClass({
  displayName: "ProjectRow",

  render() {
    let className = ctx("project-category-icon", "section-icon",
                        this.props.project.category);

    return <Row className="project-row">
      <Col>
        <Row className="project-row-details">
          <Col>
            <Row className="xsmall-spacing" />
            <Row>
              <Col mdOffset={1} md={8} xsOffset={3} className="project-details">
                <h3>{this.props.project.title}</h3>
                <ul className="list-inline authors">
                  {this.props.project.authors.map(function(author) {
                    return <li className="author" key={author.id}>
                      {author.name}
                    </li>;
                  })}
                </ul>
              </Col>
              <Col md={3}>
                <Row className="project-other-details">
                  <Col md={1} xsOffset={2} xs={1} className="map-marker" />
                  <Col md={1} xs={1} className="location">
                    <p>{this.props.project.county}</p>
                  </Col>
                  <Col mdOffset={6} xsOffset={6} className="comments">
                    <p>{this.props.project.comments}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
        <Row className="orange-section">
          <Col md={2} xs={3} className="project-category">
            <p>{this.props.project.category_slug}</p>
          </Col>
          <Col md={1} xs={1} className={className} />
        </Row>
      </Col>
    </Row>;
  }
});
