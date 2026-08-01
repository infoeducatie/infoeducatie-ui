"use strict";

import ajax from "../../lib/ajax"
import createLegacyComponent from "@lib/create-legacy-component";
import { Grid, Col, Row, Glyphicon, Table } from "@ui/bootstrap";
import ctx from "classnames";
import { withTranslation } from "react-i18next";

import "../../main.less";
import CloudCount from "../cloud-count"
import Header from "../header";
import EditionSelector from "../edition-selector";
import ProjectCard from "./project_card";
import FilterIcon from "./filter_icon";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeSearchValue(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ro");
}


const Contestants = createLegacyComponent({
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
      searchTerm: "",
      selectedEdition: this.props.edition
   };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.edition.id !== this.props.edition.id) {
      this.setState({ selectedEdition: nextProps.edition });
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

  onSearchChange(event) {
    this.setState({ searchTerm: event.currentTarget.value });
  },

  getVisibleProjects() {
    let query = normalizeSearchValue(this.state.searchTerm.trim());

    return this.state.projects.filter((project) => {
      let matchesCategory = this.state.currentCategory === "all" ||
        project.category === this.state.currentCategory;

      if (!matchesCategory || !query) {
        return matchesCategory;
      }

      let searchableValues = [
        project.title,
        project.category,
        ...asArray(project.counties),
        ...asArray(project.contestants).map((contestant) => contestant && contestant.name),
      ];

      return normalizeSearchValue(searchableValues.join(" ")).includes(query);
    });
  },

  renderErrors() {
    if (this.state.hasError) {
      return <p>{this.props.t("contestants.serverError")}</p>;
    }
  },

  renderProjectRow(project){
    return <tr key={project.id} className="contestant">
        <td className="county" data-label={this.props.t("contestants.columns.county")}>
          <ul className="list-unstyled">
            {asArray(project.counties).map(function(county, index) {
              return <li key={index}>{county}</li>;
            })}
          </ul>
        </td>
        <td className="title" data-label={this.props.t("contestants.columns.project")}>
          <a href={project.discourse_url}>{project.title}</a>
        </td>
        <td className="authors" data-label={this.props.t("contestants.columns.contestant")}>
          <ul className="list-unstyled">
            {asArray(project.contestants).map(function(contestant){
              return <li className="author" key={contestant.id}>{contestant.name}</li>;
            })}
          </ul>
        </td>
        <td className="category" data-label={this.props.t("contestants.columns.category")}>{project.category}</td>
        <td className="comments" data-label={this.props.t("contestants.columns.comments")}><CloudCount count={project.comments_count} /></td>
      </tr>;
  },

  renderTable() {
    let projects = this.getVisibleProjects();

    if (this.state.showTable) {
      return <Row>
        <Col md={8} mdOffset={2}>
          <h2 className="visually-hidden" id="participant-projects-heading">
            {this.props.t("contestants.projectList")}
          </h2>
          <div
            aria-labelledby="participant-projects-heading"
            className="data-region table-responsive"
            role="region"
            tabIndex="0"
          >
            <Table>
              <thead>
                <tr>
                  <th>{this.props.t("contestants.columns.county")}</th>
                  <th>{this.props.t("contestants.columns.project")}</th>
                  <th>{this.props.t("contestants.columns.contestant")}</th>
                  <th>{this.props.t("contestants.columns.category")}</th>
                  <th>{this.props.t("contestants.columns.comments")}</th>
                </tr>
              </thead>
              <tbody>
                 {projects.map(this.renderProjectRow)}
              </tbody>
            </Table>
          </div>
          {!projects.length ? (
            <p className="empty-state" role="status">
              {this.props.t("contestants.empty")}
            </p>
          ) : null}
        </Col>
      </Row>;
    }

    return null;
  },

  renderProjectCard(project) {
    return <ProjectCard project={project} key={project.id} />;
  },

  renderGrid() {
    let projects = this.getVisibleProjects();

    if (this.state.showGrid) {
      return <Grid className="projects-grid">
               {projects.map(this.renderProjectCard)}
               {!projects.length ? (
                 <p className="empty-state" role="status">
                   {this.props.t("contestants.empty")}
                 </p>
               ) : null}
             </Grid>;
    }

    return null;
  },

  render() {
    let gridClassName = ctx({
      "view-toggle hidden-xs": true,
      "inactive": !this.state.showGrid
    });
    let tableClassName = ctx({
      "view-toggle hidden-xs": true,
      "inactive": !this.state.showTable
    });
    let visibleProjectCount = this.getVisibleProjects().length;

    return <div className="contestants">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn}
                  current={this.props.current}
                  language={this.props.language}
                  changeLanguage={this.props.changeLanguage}
                  logout={this.props.logout} />
          <Row className="xsmall-spacing" />
          <Row>
            <Col>
              <h1>{this.props.t("contestants.title")}</h1>
              <h2>{this.props.t("edition.label", {
                edition: this.state.selectedEdition.name ||
                  this.state.selectedEdition.count ||
                  this.state.selectedEdition.year,
              })}</h2>
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
                  <p className="description">{this.props.t("contestants.participants")}</p>
                  <p className="value">
                    {this.state.selectedEdition.contestants_count}
                  </p>
              </Col>
              <Col xs={4} className="border-left">
                  <p className="description">{this.props.t("contestants.projects")}</p>
                  <p className="value">
                    {this.state.selectedEdition.projects_count}
                  </p>
              </Col>
              <Col xs={4} className="border-left">
                  <p className="description">{this.props.t("contestants.counties")}</p>
                  <p className="value">
                    {this.state.selectedEdition.counties_count}
                  </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>

      <Grid>
        <Row className="xsmall-spacing" />
        <Row>
          <Col xs={12}>
            <div className="edition-filter">
            <label className="control-label" htmlFor="participant-edition">
              {this.props.t("edition.displayed")}
            </label>
            <EditionSelector onCallback={this.onEditionChange}
                             id="participant-edition"
                             ariaLabel={this.props.t("edition.displayed")}
                             filter="has_projects" />
            </div>
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row className="participant-search">
          <Col md={8} mdOffset={2}>
            <label className="control-label" htmlFor="participant-search">
              {this.props.t("contestants.searchLabel")}
            </label>
            <input
              className="form-control"
              id="participant-search"
              onChange={this.onSearchChange}
              placeholder={this.props.t("contestants.searchPlaceholder")}
              type="search"
              value={this.state.searchTerm}
            />
            <p aria-live="polite" className="results-count">
              {this.props.t("contestants.shown", { count: visibleProjectCount })}
            </p>
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row className="filter-buttons">
          <Col smOffset={2} sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="all" />
            <p>{this.props.t("categories.all")}</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="web" />
            <p>{this.props.t("categories.web")}</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="educational" />
            <p>{this.props.t("categories.educational")}</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="roboti" />
            <p>{this.props.t("categories.robots")}</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="utilitar" />
            <p>{this.props.t("categories.utility")}</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="multimedia" />
            <p>{this.props.t("categories.multimedia")}</p>
          </Col>
          <Col smOffset={2} sm={1} className="hidden-xs">
            <button
              aria-label={this.props.t("contestants.gridAria")}
              aria-pressed={this.state.showGrid}
              className={gridClassName}
              onClick={this.showGrid}
              title={this.props.t("contestants.gridTitle")}
              type="button"
            >
              <Glyphicon glyph="th-large" />
            </button>
          </Col>
          <Col sm={1} className="hidden-xs">
            <button
              aria-label={this.props.t("contestants.tableAria")}
              aria-pressed={this.state.showTable}
              className={tableClassName}
              onClick={this.showTable}
              title={this.props.t("contestants.tableTitle")}
              type="button"
            >
              <Glyphicon glyph="align-justify" />
            </button>
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
      success: (data) => {
        this.setState({ projects: Array.isArray(data) ? data : [], hasError: false });
      },
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
    this.setState({ selectedEdition: edition });
  }
});

export default withTranslation("public")(Contestants);
