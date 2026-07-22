"use strict";

import ajax from "../../lib/ajax"
import createLegacyComponent from "@lib/create-legacy-component";
import { Grid, Col, Row, Glyphicon, Table } from "@ui/bootstrap";
import ctx from "classnames";

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


export default createLegacyComponent({
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
    if (nextProps.edition.name !== this.props.edition.name) {
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
      return <p>Datele nu au putut fi luate de pe server.</p>;
    }
  },

  renderProjectRow(project){
    return <tr key={project.id} className="contestant">
        <td className="county" data-label="Județ">
          <ul className="list-unstyled">
            {asArray(project.counties).map(function(county, index) {
              return <li key={index}>{county}</li>;
            })}
          </ul>
        </td>
        <td className="title" data-label="Titlul lucrării">
          <a href={project.discourse_url}>{project.title}</a>
        </td>
        <td className="authors" data-label="Concurent">
          <ul className="list-unstyled">
            {asArray(project.contestants).map(function(contestant){
              return <li className="author" key={contestant.id}>{contestant.name}</li>;
            })}
          </ul>
        </td>
        <td className="category" data-label="Categorie">{project.category}</td>
        <td className="comments" data-label="Comentarii"><CloudCount count={project.comments_count} /></td>
      </tr>;
  },

  renderTable() {
    let projects = this.getVisibleProjects();

    if (this.state.showTable) {
      return <Row>
        <Col md={8} mdOffset={2}>
          <h2 className="visually-hidden" id="participant-projects-heading">
            Lista proiectelor
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
                  <th>județ</th>
                  <th>titlul lucrării</th>
                  <th>concurent</th>
                  <th>categorie</th>
                  <th>comentarii</th>
                </tr>
              </thead>
              <tbody>
                 {projects.map(this.renderProjectRow)}
              </tbody>
            </Table>
          </div>
          {!projects.length ? (
            <p className="empty-state" role="status">
              Nu am găsit proiecte pentru filtrele selectate.
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
                   Nu am găsit proiecte pentru filtrele selectate.
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
              <h1>Participanți InfoEducație</h1>
              <h2>Ediția {this.state.selectedEdition.name}</h2>
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
                    {this.state.selectedEdition.contestants_count}
                  </p>
              </Col>
              <Col xs={4} className="border-left">
                  <p className="description">Proiecte</p>
                  <p className="value">
                    {this.state.selectedEdition.projects_count}
                  </p>
              </Col>
              <Col xs={4} className="border-left">
                  <p className="description">Județe</p>
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
              Ediția afișată
            </label>
            <EditionSelector onCallback={this.onEditionChange}
                             id="participant-edition"
                             ariaLabel="Ediția afișată"
                             filter="has_projects" />
            </div>
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row className="participant-search">
          <Col md={8} mdOffset={2}>
            <label className="control-label" htmlFor="participant-search">
              Caută proiecte
            </label>
            <input
              className="form-control"
              id="participant-search"
              onChange={this.onSearchChange}
              placeholder="Titlu, participant sau județ"
              type="search"
              value={this.state.searchTerm}
            />
            <p aria-live="polite" className="results-count">
              {visibleProjectCount} {visibleProjectCount === 1
                ? "proiect afișat"
                : "proiecte afișate"}
            </p>
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row className="filter-buttons">
          <Col smOffset={2} sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="all" />
            <p>Toți</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="web" />
            <p>Web</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="educational" />
            <p>Educațional</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="roboti" />
            <p>Roboți</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="utilitar" />
            <p>Utilitar</p>
          </Col>
          <Col sm={1} xs={4}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="multimedia" />
            <p>Multimedia</p>
          </Col>
          <Col smOffset={2} sm={1} className="hidden-xs">
            <button
              aria-label="Afișează proiectele sub formă de carduri"
              aria-pressed={this.state.showGrid}
              className={gridClassName}
              onClick={this.showGrid}
              title="Vizualizare carduri"
              type="button"
            >
              <Glyphicon glyph="th-large" />
            </button>
          </Col>
          <Col sm={1} className="hidden-xs">
            <button
              aria-label="Afișează proiectele sub formă de tabel"
              aria-pressed={this.state.showTable}
              className={tableClassName}
              onClick={this.showTable}
              title="Vizualizare tabel"
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
