"use strict";
import React from "react";

import { Grid, Col, Row, Glyphicon } from "react-bootstrap";
import ctx from "classnames";

import Header from "./header";
import { ProjectCard, ProjectRow } from "./project";
import projectsFixture from "../fixtures/projects";

import "./contestants.less";


var FilterIcon = React.createClass({
  displayName: "FilterIcon",

  toggleCategory() {
    this.props.toggleCategory(this.props.category);
  },

  render() {
    let parentClasses = ctx({
      "round-icon": true,
      "inactive": (this.props.currentCategory !== this.props.category &&
                   this.props.currentCategory !== "all")
    });
    let childClasses = ctx("section-icon", this.props.category);

    return <div onClick={this.toggleCategory} className={parentClasses}>
      <span className={childClasses} />
    </div>;
  }

});


export default React.createClass({
  displayName: "Participants",

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
    let isMobile = Math.max(document.documentElement.clientWidth,
                            window.innerWidth || 0) <= 768;

    return {
      projects: projectsFixture,
      showGrid: isMobile ? false : true,
      showTable: isMobile ? true : false,
      currentCategory: "all"
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
    if (this.state.currentCategory === category) {
      category = "all";
    }

    this.setState({
      currentCategory: category
    });
  },

  renderProjectCard(project) {
    var card = null;

    if (project.category === this.state.currentCategory ||
        this.state.currentCategory === "all") {

      card = <ProjectCard project={project} key={project.id} />;
    }

    return card;
  },

  renderGrid() {
    var grid = null;

    if (this.state.showGrid) {
      grid = <Row className="projects-grid hidden-xs">
        {this.state.projects.map(this.renderProjectCard)}
      </Row>;
    }

    return grid;
  },

  render() {
    let gridClassName = ctx({
      "icon hidden-xs": true,
      "inactive": !this.state.showGrid
    });
    var tableClassName = ctx({
      "icon hidden-xs": true,
      "inactive": !this.state.showTable
    });
    var currentCategory = this.state.currentCategory;

    return <div className="contestants">
        <div className="blue-section-wrapper">
          <Grid className="blue-section">
            <Header isLoggedIn={this.props.isLoggedIn} />
            <Row className="xsmall-spacing" />
            <Row>
              <Col>
                <h1>Participanți InfoEducație Ediția 2015</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Concurs Național de Informatică</h2>
              </Col>
            </Row>
            <Row className="big-spacing" />
          </Grid>
        </div>
        <Grid className="stats-section">
          <Row>
            <Col md={6} mdOffset={3}
                 sm={8} smOffset={2}
                 xs={12}>
              <Row className="inner-stats">
                <Col xs={4}>
                    <p className="description">Participanți</p>
                    <p className="value">75</p>
                </Col>
                <Col xs={4} className="border-left">
                    <p className="description">Proiecte</p>
                    <p className="value">39</p>
                </Col>
                <Col xs={4} className="border-left">
                    <p className="description">Județe</p>
                    <p className="value">17</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      <Grid>
        <Row className="big-spacing" />
        <Row className="filter-buttons">
          <Col mdOffset={2} md={1}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="educational" />
          </Col>
          <Col md={1}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="media" />
          </Col>
          <Col md={1}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="robots" />
          </Col>
          <Col md={1}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="utility" />
          </Col>
          <Col md={1}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="web" />
          </Col>
          <Col mdOffset={2} md={1}>
            <Glyphicon glyph="th-large"
                       className={gridClassName}
                       onClick={this.showGrid} />
          </Col>
          <Col md={1}>
            <Glyphicon glyph="align-justify"
                       className={tableClassName}
                       onClick={this.showTable} />
          </Col>
        </Row>
      </Grid>
      <Grid className="projects">
          <Row className="small-spacing" />
          {this.renderGrid()}
          {this.state.showTable ?
            <Row className="projects-list">
              <Col md={12}>
                {
                 this.state.projects.map(function(project) {
                  return project.category === currentCategory || currentCategory === "all" ?
                          <ProjectRow
                            title={project.title}
                            authors={project.authors}
                            category={project.category}
                            category_slug={project.category_slug}
                            county={project.county}
                            comments={project.comments} /> : "";
                })}
              </Col>
            </Row> : null}
        </Grid>
      </div>;
  }
});
