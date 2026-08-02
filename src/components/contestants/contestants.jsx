"use strict";

import ajax from "../../lib/ajax"
import createLegacyComponent from "@lib/create-legacy-component";
import { Grid, Col, Row, Table } from "@ui/bootstrap";
import ctx from "classnames";
import { LayoutGrid, List } from "lucide-react";
import { withTranslation } from "react-i18next";

import "../../main.less";
import CloudCount from "../cloud-count"
import SecondaryHero from "../secondary-hero";
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

function itemName(item) {
  if (typeof item === "string") {
    return item;
  }

  return item && (item.name || item.title);
}

function formatScore(score) {
  if (
    score === null ||
    score === undefined ||
    (typeof score === "string" && score.trim() === "")
  ) {
    return score;
  }

  const numericScore = Number(score);
  return Number.isFinite(numericScore) ? numericScore.toFixed(2) : score;
}

const Contestants = createLegacyComponent({
  displayName: "Contestants",

  componentDidMount() {
    this.props.refreshCurrent();
    this.getContestants();
    this.getResultEditions();
  },

  getInitialState: function() {
    return {
      projects: [],
      hasError: false,
      showGrid: false,
      showTable: true,
      currentCategory: "all",
      searchTerm: "",
      selectedEdition: this.props.edition,
      resultEditionIds: this.props.lastEditionWithResults
        ? [this.props.lastEditionWithResults.id]
        : [],
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

    let projects = this.state.projects.filter((project) => {
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

    if (this.hasPublishedResults()) {
      return [...projects].sort((first, second) => {
        if (this.state.currentCategory === "all") {
          const categoryOrder = first.category.localeCompare(second.category);
          if (categoryOrder !== 0) return categoryOrder;
        }

        return Number(second.total_score || 0) - Number(first.total_score || 0);
      });
    }

    return projects;
  },

  hasPublishedResults() {
    return this.state.resultEditionIds.includes(this.state.selectedEdition.id);
  },

  renderErrors() {
    if (this.state.hasError) {
      return <p>{this.props.t("contestants.serverError")}</p>;
    }
  },

  renderList(items, className) {
    return (
      <ul className="list-unstyled">
        {asArray(items).map(itemName).filter(Boolean).map((item, index) => (
          <li className={className} key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    );
  },

  renderProjectTitle(project) {
    return project.discourse_url ? (
      <a href={project.discourse_url}>{project.title}</a>
    ) : project.title;
  },

  renderProjectRow(project) {
    if (this.hasPublishedResults()) {
      return (
        <tr key={project.id} className="contestant result">
          <td
            className="rank"
            data-label={this.props.t("contestants.results.columns.prize")}
          >
            <span className="result-rank-value">{project.prize}</span>
          </td>
          <td
            className="title"
            data-label={this.props.t("contestants.results.columns.project")}
          >
            {this.renderProjectTitle(project)}
          </td>
          <td
            className="authors"
            data-label={this.props.t("contestants.results.columns.contestant")}
          >
            {this.renderList(project.contestants, "author")}
          </td>
          <td
            className="school hidden-sm hidden-xs"
            data-label={this.props.t("contestants.results.columns.school")}
          >
            {this.renderList(project.schools)}
          </td>
          <td
            className="county hidden-sm hidden-xs"
            data-label={this.props.t("contestants.results.columns.county")}
          >
            {this.renderList(project.counties)}
          </td>
          <td
            className="teacher hidden-sm hidden-xs"
            data-label={this.props.t("contestants.results.columns.teacher")}
          >
            {this.renderList(project.mentoring_teachers)}
          </td>
          <td
            className="category hidden-sm hidden-xs"
            data-label={this.props.t("contestants.columns.category")}
          >
            {project.category}
          </td>
          <td
            className="score hidden-sm hidden-xs"
            data-label={this.props.t("contestants.results.columns.score")}
          >
            {formatScore(project.score)}
          </td>
          <td
            className="score hidden-sm hidden-xs"
            data-label={this.props.t("contestants.results.columns.open")}
          >
            {formatScore(project.extra_score)}
          </td>
          <td
            className="score total"
            data-label={this.props.t("contestants.results.columns.total")}
          >
            <span className="result-total-value">
              {formatScore(project.total_score)}
            </span>
          </td>
        </tr>
      );
    }

    return <tr key={project.id} className="contestant">
        <td className="county" data-label={this.props.t("contestants.columns.county")}>
          {this.renderList(project.counties)}
        </td>
        <td className="title" data-label={this.props.t("contestants.columns.project")}>
          {this.renderProjectTitle(project)}
        </td>
        <td className="authors" data-label={this.props.t("contestants.columns.contestant")}>
          {this.renderList(project.contestants, "author")}
        </td>
        <td className="category" data-label={this.props.t("contestants.columns.category")}>{project.category}</td>
        <td className="comments" data-label={this.props.t("contestants.columns.comments")}><CloudCount count={project.comments_count} /></td>
      </tr>;
  },

  renderTable() {
    let projects = this.getVisibleProjects();
    let showResults = this.hasPublishedResults();

    if (this.state.showTable) {
      return <Row>
        <Col md={showResults ? 12 : 8} mdOffset={showResults ? 0 : 2}>
          <h2 className="visually-hidden" id="participant-projects-heading">
            {this.props.t(showResults
              ? "contestants.results.ranking"
              : "contestants.projectList")}
          </h2>
          <div
            aria-labelledby="participant-projects-heading"
            className="data-region table-responsive"
            role="region"
            tabIndex="0"
          >
            <Table className={showResults ? "results-table" : ""}>
              <thead>
                {showResults ? (
                  <tr>
                    <th>{this.props.t("contestants.results.columns.prize")}</th>
                    <th className="left">{this.props.t("contestants.results.columns.project")}</th>
                    <th className="left">{this.props.t("contestants.results.columns.contestant")}</th>
                    <th className="left hidden-sm hidden-xs">{this.props.t("contestants.results.columns.school")}</th>
                    <th className="left hidden-sm hidden-xs">{this.props.t("contestants.results.columns.county")}</th>
                    <th className="left hidden-sm hidden-xs">{this.props.t("contestants.results.columns.teacher")}</th>
                    <th className="left hidden-sm hidden-xs">{this.props.t("contestants.columns.category")}</th>
                    <th className="hidden-sm hidden-xs">{this.props.t("contestants.results.columns.score")}</th>
                    <th className="hidden-sm hidden-xs">{this.props.t("contestants.results.columns.open")}</th>
                    <th>{this.props.t("contestants.results.columns.total")}</th>
                  </tr>
                ) : (
                  <tr>
                    <th>{this.props.t("contestants.columns.county")}</th>
                    <th>{this.props.t("contestants.columns.project")}</th>
                    <th>{this.props.t("contestants.columns.contestant")}</th>
                    <th>{this.props.t("contestants.columns.category")}</th>
                    <th>{this.props.t("contestants.columns.comments")}</th>
                  </tr>
                )}
              </thead>
              <tbody>
                 {projects.map(this.renderProjectRow)}
              </tbody>
            </Table>
          </div>
          {!projects.length ? (
            <p className="empty-state" role="status">
              {this.props.t(showResults
                ? "contestants.results.empty"
                : "contestants.empty")}
            </p>
          ) : null}
        </Col>
      </Row>;
    }

    return null;
  },

  renderProjectCard(project) {
    return <ProjectCard
      project={project}
      key={project.id}
      showResults={this.hasPublishedResults()}
      t={this.props.t}
    />;
  },

  renderGrid() {
    let projects = this.getVisibleProjects();

    if (this.state.showGrid) {
      return <div className="projects-grid">
               <h2 className="visually-hidden" id="participant-projects-grid-heading">
                 {this.props.t(this.hasPublishedResults()
                   ? "contestants.results.ranking"
                   : "contestants.projectList")}
               </h2>
               {projects.map(this.renderProjectCard)}
               {!projects.length ? (
                 <p className="empty-state" role="status">
                   {this.props.t("contestants.empty")}
                 </p>
               ) : null}
             </div>;
    }

    return null;
  },

  render() {
    let gridClassName = ctx({
      "view-toggle": true,
      "inactive": !this.state.showGrid
    });
    let tableClassName = ctx({
      "view-toggle": true,
      "inactive": !this.state.showTable
    });
    let visibleProjectCount = this.getVisibleProjects().length;
    let categoryFilters = [
      ["all", "categories.all"],
      ["web", "categories.web"],
      ["educational", "categories.educational"],
      ["roboti", "categories.robots"],
      ["utilitar", "categories.utility"],
      ["multimedia", "categories.multimedia"],
    ];

    return <div className="contestants">
      <SecondaryHero headerProps={this.props}>
        <h1>{this.props.t("contestants.title")}</h1>
        <h2>{this.props.t("edition.label", {
          edition: this.state.selectedEdition.name ||
            this.state.selectedEdition.count ||
            this.state.selectedEdition.year,
        })}</h2>
      </SecondaryHero>

      <Grid className="stats-section">
        <div className="inner-stats">
          <div className="stat-item">
            <p className="description">{this.props.t("contestants.participants")}</p>
            <p className="value">{this.state.selectedEdition.contestants_count}</p>
          </div>
          <div className="stat-item">
            <p className="description">{this.props.t("contestants.projects")}</p>
            <p className="value">{this.state.selectedEdition.projects_count}</p>
          </div>
          <div className="stat-item">
            <p className="description">{this.props.t("contestants.counties")}</p>
            <p className="value">{this.state.selectedEdition.counties_count}</p>
          </div>
        </div>
      </Grid>

      <Grid className="participant-tools">
        <div className="participant-controls">
          <div className="edition-filter tool-field">
            <label className="control-label" htmlFor="participant-edition">
              {this.props.t("edition.displayed")}
            </label>
            <EditionSelector onCallback={this.onEditionChange}
                             id="participant-edition"
                             ariaLabel={this.props.t("edition.displayed")}
                             filter="has_projects" />
            {this.hasPublishedResults() ? (
              <p className="results-available" role="status">
                {this.props.t("contestants.results.published")}
              </p>
            ) : null}
          </div>
          <div className="participant-search tool-field">
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
          </div>
        </div>
        <div className="filter-buttons">
          <div className="category-filters">
            {categoryFilters.map(([category, labelKey]) => (
              <div className="filter-option" key={category}>
                <FilterIcon currentCategory={this.state.currentCategory}
                            toggleCategory={this.toggleCategory}
                            category={category} />
                <p>{this.props.t(labelKey)}</p>
              </div>
            ))}
          </div>
          <div className="view-controls">
            <button
              aria-label={this.props.t("contestants.gridAria")}
              aria-pressed={this.state.showGrid}
              className={gridClassName}
              onClick={this.showGrid}
              title={this.props.t("contestants.gridTitle")}
              type="button"
            >
              <LayoutGrid aria-hidden="true" size={20} />
              <span>{this.props.t("contestants.gridTitle")}</span>
            </button>
            <button
              aria-label={this.props.t("contestants.tableAria")}
              aria-pressed={this.state.showTable}
              className={tableClassName}
              onClick={this.showTable}
              title={this.props.t("contestants.tableTitle")}
              type="button"
            >
              <List aria-hidden="true" size={20} />
              <span>{this.props.t("contestants.tableTitle")}</span>
            </button>
          </div>
        </div>
      </Grid>

      <Grid className="projects">
        {this.renderGrid()}
        {this.renderTable()}
        {this.renderErrors()}
      </Grid>
    </div>;
  },

  getResultEditions() {
    ajax({
      endpoint: "editions.json?has_results=true",
      success: (data) => {
        let resultEditionIds = asArray(data).map((edition) => edition.id);
        this.setState({ resultEditionIds });
      },
    });
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
