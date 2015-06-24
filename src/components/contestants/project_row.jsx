"use strict";

import React from "react";

import ctx from "classnames";
import { Row, Col } from "react-bootstrap";


export default React.createClass({
  displayName: "ProjectRow",

  render() {
    let className = ctx("project-category-icon", "section-icon",
                        this.props.project.category);

    return <Row>
      <Col md={12}>
        <Row className="project-row">
          <Col md={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col md={9} className="project-details">
                <span className="project-title">
                  {this.props.project.title}
                </span>
                <div className="authors">
                  {this.props.project.authors.map(function(author) {
                    return <span className="author" key={author.key}>{author.name}</span>;
                  })}
                </div>
              </Col>
              <Col md={2}>
                <div className="project-other-details">
                  <span className="map-marker" />
                  <span className="location">
                    {this.props.project.county}
                  </span>
                  <span className="comments">
                    {this.props.project.comments}
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
        <Row className="orange-section">
          <span className="project-category">
            {this.props.project.category_slug}
          </span>
          <span className={className} />
        </Row>
      </Col>
    </Row>;
  }
});
