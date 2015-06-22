"use strict";
import React from "react";

import { Grid, Col, Row, Glyphicon } from "react-bootstrap";

import Header from "./header";
import { ProjectCard, ProjectRow } from "./project";
import projectsFixture from "../fixtures/projects";

import "./contestants.less";


export default React.createClass({
  displayName: "Participanti",

  getInitialState: function() {
    // on mobile we need to show only the list view
    // for that, the best way is to avoid rendering the grid view
    //
    // we used
    // http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
    // get the width of the viewport and we know that bootstrap has 3 responsive
    // breakpoints (http://stackoverflow.com/questions/18575582/how-to-detect-responsive-breakpoints-of-twitter-bootstrap-3-using-javascript)
    //    * 768px  => small (usually mobile devices)
    //    * 992px  => medium
    //    * 1200px => large
    let isMobile = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 768;

    return {
     projects: projectsFixture,
     showGrid: isMobile ? false : true,
     showTable: isMobile ? true : false,
     showCategory: {
        "educational": true,
        "utility": true,
        "web": true,
        "media": true,
        "robots": true
     }
   };

  },

  showGrid() {
    this.setState({
      showTable: false,
      showGrid: true
    });
  },

  showTable() {
    this.setState({
      showTable: true,
      showGrid: false
    });
  },

  toggleCategory(category) {
    var newStates = this.state.showCategory;
    newStates[category] = this.state.showCategory[category] ? false : true;

    this.setState({ showCategory: newStates });
  },

  render() {
    var gridClassName = "icon hidden-xs " + (this.state.showGrid ? "" : "inactive");
    var tableClassName = "icon hidden-xs " + (this.state.showTable ? "" : "inactive");
    var categories = this.state.showCategory;

    return <div className="contestants">
        <div className="blue-section-wrapper">
          <Grid className="blue-section">
            <Header isLoggedIn={this.props.isLoggedIn} />
            <Row className="xsmall-spacing" />
            <Row>
              <Col md={12}>
                <h1>Participanți InfoEducație Ediția 2015</h1>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h2>Concurs Național de Informatică</h2>
              </Col>
            </Row>
            <Row className="big-spacing" />
            <Row>
              <Col md={6} mdOffset={3} className="middle-align hidden-xs hidden-ms">
                <Row className="stats">
                  <Col md={4} xs={2} className="right-border">
                      <p className="description">Participanți</p>
                      <p className="value">75</p>
                  </Col>
                  <Col md={4} xs={2} className="right-border">
                      <p className="description">Proiecte</p>
                      <p className="value">39</p>
                  </Col>
                  <Col md={4} xs={2} >
                      <p className="description">Județe</p>
                      <p className="value">17</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
        <Row className="big-spacing" />
        <div className="white-section-wrapper">
          <Grid>
            <Row className="white-section">
              <Col mdOffset={2} md={1}>
                <div onClick={this.toggleCategory.bind(this, "educational")}
                     className={"round-icon " + (this.state.showCategory.educational ? "" : "inactive") }>
                      <span className="section-icon educational" />
                </div>
              </Col>
              <Col md={1}>
                <div onClick={this.toggleCategory.bind(this, "media")}
                     className={"round-icon " + (this.state.showCategory.media ? "" : "inactive") }>
                      <span className="section-icon media" />
                </div>
              </Col>
              <Col md={1}>
                <div onClick={this.toggleCategory.bind(this, "robots")}
                     className={"round-icon " + (this.state.showCategory.robots ? "" : "inactive") }>
                      <span className="section-icon robots" />
                </div>
              </Col>
              <Col md={1}>
                <div onClick={this.toggleCategory.bind(this, "utility")}
                     className={"round-icon " + (this.state.showCategory.utility ? "" : "inactive") }>
                      <span className="section-icon utility" />
                </div>
              </Col>
              <Col md={1}>
                <div onClick={this.toggleCategory.bind(this, "web")}
                     className={"round-icon " + (this.state.showCategory.web ? "" : "inactive") }>
                      <span className="section-icon web" />
                </div>
              </Col>
              <Col mdOffset={2} md={1}>
                <Glyphicon glyph="th-large" className={gridClassName} onClick={this.showGrid} />
              </Col>
              <Col md={1}>
                <Glyphicon glyph="align-justify" className={tableClassName} onClick={this.showTable} />
              </Col>
            </Row>
          </Grid>
          <Grid>
              <Row className="small-spacing" />
              {this.state.showGrid ?
                <Row className="white-section projects-grid hidden-xs">
                    {
                     this.state.projects.map(function(project) {
                      return categories[project.category] ?
                              <ProjectCard
                                title={project.title}
                                authors={project.authors}
                                category={project.category}
                                county={project.county}
                                comments={project.comments} /> : "";
                    })}
                </Row> : null}

              {this.state.showTable ?
                <Row className="white-section projects-list">
                  <Col md={12}>
                    {
                     this.state.projects.map(function(project) {
                      return categories[project.category] ?
                              <ProjectRow
                                title={project.title}
                                authors={project.authors}
                                category={project.category}
                                county={project.county}
                                comments={project.comments} /> : "";
                    })}
                  </Col>
                </Row> : null}
            </Grid>
        </div>
      </div>;
  }
});
