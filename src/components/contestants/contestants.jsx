"use strict";

import React from "react";

import { Grid, Col, Row, Glyphicon, Table } from "react-bootstrap";
import ctx from "classnames";

import Header from "../header";
import ProjectCard from "./project_card";
import FilterIcon from "./filter_icon";
import projectsFixture from "../../fixtures/projects";

import "./contestants.less";


export default React.createClass({
  displayName: "Contestants",

  getInitialState: function() {
    return {
      projects: projectsFixture,
      showGrid: false,
      showTable: true,
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

  renderProjectRow(project){
    let row = null;

    if (this.state.currentCategory === project.category ||
        this.state.currentCategory === "all") {
      row = <tr>
        <td className="county">{project.county}</td>
        <td className="title">{project.title}</td>
        <td className="authors">
          <ul className="list-unstyled">
            {project.authors.map(function(author){
              return <li className="author">{author.name}</li>;
            })}
          </ul>
        </td>
        <td className="category">{project.category_slug}</td>
      </tr>;
    }

    return row;
  },

  renderTable() {
    return <Table responsive>
      <thead>
        <tr>
          <th>județ</th>
          <th>titlul lucrării</th>
          <th>categorie</th>
          <th>concurent</th>
        </tr>
      </thead>
      <tbody>
         {this.state.projects.map(this.renderProjectRow)}
      </tbody>
    </Table>;
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
      grid = <Grid className="projects-grid">
               {this.state.projects.map(this.renderProjectCard)}
             </Grid>;
    }

    return grid;
  },

  render() {
    let gridClassName = ctx({
      "icon hidden-xs": true,
      "inactive": !this.state.showGrid
    });
    let tableClassName = ctx({
      "icon hidden-xs": true,
      "inactive": !this.state.showTable
    });

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
          <Col smOffset={2} sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="educational" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="media" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="robots" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="utility" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="web" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="all" />
          </Col>
          <Col smOffset={2} sm={1}>
            <Glyphicon glyph="th-large"
                       className={gridClassName}
                       onClick={this.showGrid} />
          </Col>
          <Col sm={1}>
            <Glyphicon glyph="align-justify"
                       className={tableClassName}
                       onClick={this.showTable} />
          </Col>
        </Row>
      </Grid>

      <Grid className="projects">
        <Row className="small-spacing" />
        {this.renderGrid()}
        {this.renderTable()}
      </Grid>
    </div>;
  }
});
