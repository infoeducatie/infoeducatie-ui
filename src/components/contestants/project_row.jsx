"use strict";

import React from "react";

import ctx from "classnames";
import { Row, Col } from "react-bootstrap";
import MapMarker from "../../../assets/img/icons/location.png";

import "./project_row.less";


export default React.createClass({
  displayName: "ProjectRow",

  render() {
    let projectCategoryIconClasses = ctx(
        "project-category-icon", "section-icon", this.props.project.category);

    return <Row className="project-row">
      <Col xs={12}>
        <Row className="project-row-details">
          <Col sm={10} smOffset={1}>
            <Row className="small-spacing" />
            <Row>
              <Col sm={8} md={9} className="project-details">
                <h3>{this.props.project.title}</h3>
                <ul className="list-inline authors">
                  {this.props.project.authors.map(function(author) {
                    return <li className="author" key={author.id}>
                      {author.name}
                    </li>;
                  })}
                </ul>
              </Col>
              <Col sm={4} md={3} className="project-other-details">
                <p>
                  <img src={MapMarker} />
                  {this.props.project.county}
                  <span className="comments">
                    {this.props.project.comments}
                  </span>
                </p>
              </Col>
            </Row>
            <Row className="small-spacing" />
          </Col>
        </Row>
        <Row className="orange-section">
          <Col sm={2} smOffset={1} xs={9} className="project-category">
            <p>{this.props.project.category_slug}</p>
          </Col>
          <Col sm={1} xs={3}>
            <p><span className={projectCategoryIconClasses} /></p>
          </Col>
        </Row>
        <Row className="small-spacing" />
      </Col>
    </Row>;
  }
});
