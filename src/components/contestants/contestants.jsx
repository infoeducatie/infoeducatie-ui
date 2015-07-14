"use strict";

import $ from "jquery";
import _ from "lodash";
import ajax from "../../lib/ajax"
import React from "react";

import { Grid, Col, Row, Glyphicon, Table } from "react-bootstrap";
import ctx from "classnames";

import Header from "../header";
import EditionSelector from "../edition-selector";
import ProjectCard from "./project_card";
import FilterIcon from "./filter_icon";

import "../../main.less";


export default React.createClass({
  displayName: "Contestants",

  componentDidMount() {
    this.props.refreshCurrent();
    this.getContestants();
  },

  getInitialState: function() {
    return {
      projects: [],
      hasError: false,
      showGrid: false,
      showTable: true,
      currentCategory: "all",
      selectedEdition: this.props.edition.name
   };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.edition.name !== this.props.edition.name) {
      this.setState({ selectedEdition: nextProps.edition.name });
    }
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

  openDiscourse(discourse_url) {
    window.open(discourse_url, "_blank");
  },

  renderErrors() {
    if (this.state.hasError) {
      return <p>"Datele nu au putut fi luate de pe server."</p>;
    }
  },

  renderProjectRow(project){
    let row = null;

    if (this.state.currentCategory === project.category ||
        this.state.currentCategory === "all") {
      row = <tr key={project.id}
                className="contestant"
                onClick={this.openDiscourse.bind(this, project.discourse_url)}>
        <td className="county">{project.county}</td>
        <td className="title">{project.title}</td>
        <td className="authors">
          <ul className="list-unstyled">
            {project.contestants.map(function(contestant){
              return <li className="author" key={contestant.id}>{contestant.name}</li>;
            })}
          </ul>
        </td>
        <td className="category">{project.category}</td>
      </tr>;
    }

    return row;
  },

  renderTable() {
    let table = null;

    if (this.state.showTable) {
      table = <Row>
        <Col md={8} mdOffset={2}>
          <Table responsive>
            <thead>
              <tr>
                <th>județ</th>
                <th>titlul lucrării</th>
                <th>concurent</th>
                <th>categorie</th>
              </tr>
            </thead>
            <tbody>
               {this.state.projects.map(this.renderProjectRow)}
            </tbody>
          </Table>
        </Col>
      </Row>;
    }
    return table;
  },

  renderProjectCard(project) {
    let card = null;

    if (project.category === this.state.currentCategory ||
        this.state.currentCategory === "all") {

      card = <ProjectCard project={project} key={project.id} />;
    }

    return card;
  },

  renderGrid() {
    let grid = null;

    if (this.state.showGrid) {
      grid = <Grid className="projects-grid">
               {this.state.projects.map(this.renderProjectCard)}
             </Grid>;
    }

    return grid;
  },

  canRenderEdition(edition) {
    return edition.projects_count > 0;
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
          <Header isLoggedIn={this.props.isLoggedIn}
                  login={this.props.login}
                  logout={this.props.logout} />
          <Row className="xsmall-spacing" />
          <Row>
            <Col>
              <h1>Participanți InfoEducație</h1>
              <h2>Ediția {this.state.selectedEdition}</h2>
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
                  <p className="value">
                    {this.props.current.stats.total_participants}
                  </p>
              </Col>
              <Col xs={4} className="border-left">
                  <p className="description">Proiecte</p>
                  <p className="value">
                    {this.props.current.stats.total_projects}
                  </p>
              </Col>
              <Col xs={4} className="border-left">
                  <p className="description">Județe</p>
                  <p className="value">
                    {this.props.current.stats.total_counties}
                  </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>

      <Grid>
        <Row className="xsmall-spacing" />
        <Row>
          <Col sm={4} smOffset={4}>
            <EditionSelector onCallback={this.onEditionChange}
                             canRenderEdition={this.canRenderEdition} />
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row className="filter-buttons">
          <Col smOffset={2} sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="all" />
            <p>Toți</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="web" />
            <p>Web</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="educational" />
            <p>Educațional</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="roboti" />
            <p>Roboți</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="utilitar" />
            <p>Utilitar</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="multimedia" />
            <p>Multimedia</p>
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
        {this.renderErrors()}
      </Grid>
    </div>;
  },

  getContestants(editionId) {
    let data = editionId ? { edition: editionId } : {};

    ajax({
      endpoint: "projects.json",
      data: data,
      success: (data) => { this.setState({ projects: data }); },
      error: () => {
        this.setState({
          showGrid: false,
          showTable: false,
          hasError: true
        });
      }
    });

  },

  onEditionChange(edition) {
    this.getContestants(edition.id);
    this.setState({ selectedEdition: edition.name });
  }
});
