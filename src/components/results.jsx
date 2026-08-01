"use strict";

import _ from "lodash";
import createLegacyComponent from "@lib/create-legacy-component";
import { Grid, Col, Row, Table } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import ajax from "../lib/ajax"
import EditionSelector from "./edition-selector"
import FilterIcon from "./contestants/filter_icon";
import Header from "./header";

import "../main.less";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function itemName(item) {
  if (typeof item === "string") {
    return item;
  }

  return item && (item.name || item.title);
}

function formatScore(score) {
  if (score === null || score === undefined ||
      (typeof score === "string" && score.trim() === "")) {
    return score;
  }

  const numericScore = Number(score);
  return Number.isFinite(numericScore) ? numericScore.toFixed(2) : score;
}

function normalizeProject(project) {
  return {
    ...project,
    prize: project.prize && project.prize.length <= 3 ? project.prize : "",
    contestants: asArray(project.contestants).map(itemName).filter(Boolean),
    schools: asArray(project.schools).map(itemName).filter(Boolean),
    counties: asArray(project.counties).map(itemName).filter(Boolean),
    mentoring_teachers: asArray(project.mentoring_teachers)
      .map(itemName)
      .filter(Boolean),
  };
}


const Results = createLegacyComponent({
  displayName: "Results",

  getInitialState: function() {
    return {
      currentCategory: "web",
      currentEdition: {
        id: 0,
        name: ""
      },
      projects: [],
      isLoading: false,
      hasError: false
    };
  },

  componentWillReceiveProps(nextProps) {
    let nextEdition = nextProps.lastEditionWithResults;
    let currentEdition = this.props.lastEditionWithResults;

    if (nextEdition &&
        (!currentEdition || nextEdition.id !== currentEdition.id)) {

      this.setState({currentEdition: nextEdition});
      this.showResults(nextEdition.id);
    }
  },

  componentDidMount() {
    let edition = this.props.lastEditionWithResults;

    if (edition && edition.id) {
      this.setState({currentEdition: edition});
      this.showResults(edition.id);
    }
  },

  toggleCategory(category) {
    this.setState({
      currentCategory: category
    });
  },

  renderTable() {
    let projects = _.chain(this.state.projects)
        .filter({ "category": this.state.currentCategory })
        .value();

    // TODO @palcu: use lodash
    projects.sort((a, b) => {
      if (a.total_score > b.total_score) {
        return -1;
      }
      if (a.total_score < b.total_score) {
        return 1;
      }
      return 0;
    });

    if (this.state.isLoading) {
      return <p className="results-status" role="status">{this.props.t("results.loading")}</p>;
    }

    if (this.state.hasError) {
      return <p className="results-status error" role="alert">
        {this.props.t("results.error")}
      </p>;
    }

    return <Grid className="results-section">
      <Row>
        <Col md={12}>
          <h2 className="visually-hidden" id="results-table-heading">
            {this.props.t("results.ranking")}
          </h2>
          <div
            aria-labelledby="results-table-heading"
            className="data-region table-responsive"
            role="region"
            tabIndex="0"
          >
            <Table striped hover>
              <thead>
                <tr>
                  <th>{this.props.t("results.columns.prize")}</th>
                  <th className="left">{this.props.t("results.columns.project")}</th>
                  <th className="left">{this.props.t("results.columns.contestant")}</th>
                  <th className="left hidden-sm hidden-xs">{this.props.t("results.columns.school")}</th>
                  <th className="left hidden-sm hidden-xs">{this.props.t("results.columns.county")}</th>
                  <th className="left hidden-sm hidden-xs">{this.props.t("results.columns.teacher")}</th>
                  <th className="hidden-sm hidden-xs">{this.props.t("results.columns.score")}</th>
                  <th className="hidden-sm hidden-xs">{this.props.t("results.columns.open")}</th>
                  <th>{this.props.t("results.columns.total")}</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(function(project) {
                  return <tr key={project.id}>
                    {this.renderTableTd(project.prize, project.discourse_url, "rank", this.props.t("results.columns.prize"))}
                    {this.renderTableTd(project.title, project.discourse_url, "", this.props.t("results.columns.project"))}
                    {this.renderTableUl(project.contestants,
                                        project.discourse_url,
                                        "",
                                        "author",
                                        this.props.t("results.columns.contestant"))}
                    {this.renderTableUl(project.schools,
                                        project.discourse_url,
                                        "hidden-sm hidden-xs",
                                        "school-name",
                                        this.props.t("results.columns.school"))}
                    {this.renderTableUl(project.counties,
                                        project.discourse_url,
                                        "hidden-sm hidden-xs",
                                        "county",
                                        this.props.t("results.columns.county"))}
                    {this.renderTableUl(project.mentoring_teachers,
                                        project.discourse_url,
                                        "hidden-sm hidden-xs",
                                        "county",
                                        this.props.t("results.columns.teacher"))}
                    {this.renderTableTd(formatScore(project.score),
                                        project.discourse_url,
                                        "hidden-sm hidden-xs score",
                                        this.props.t("results.columns.score"))}
                    {this.renderTableTd(formatScore(project.extra_score),
                                        project.discourse_url,
                                        "hidden-sm hidden-xs score",
                                        this.props.t("results.columns.open"))}
                    {this.renderTableTd(formatScore(project.total_score),
                                        project.discourse_url,
                                        "score",
                                        this.props.t("results.columns.total"))}
                  </tr>;
                }.bind(this))}
              </tbody>
            </Table>
          </div>
          {!projects.length ? (
            <p className="results-status" role="status">
              {this.props.t("results.empty")}
            </p>
          ) : null}
        </Col>
      </Row>
    </Grid>;
  },

  renderTableTd(content, url, tdClassName, label) {
    let hasContent = content !== null && content !== undefined && content !== "";

    return (
      <td className={tdClassName} data-label={label}>
        {url && hasContent ? <a href={url}>{content}</a> : content}
      </td>
    );
  },

  renderTableUl(items, url, tdClassName, liClassName, label) {
    return (
      <td className={tdClassName} data-label={label}>
        <ul className="list-unstyled">
          {asArray(items).map(function(item, index){
            return <li key={`${item}-${index}`} className={liClassName}>
              {url ? <a href={url}>{item}</a> : item}
            </li>;
          })}
        </ul>
      </td>
    );
  },

  render() {
    return <div className="results">
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
              <h1>{this.props.t("results.title")}</h1>
              {this.state.currentEdition.name ? <h2>{this.state.currentEdition.name}</h2> : null}
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>

      <Grid>
        <Row className="small-spacing" />
        <Row>
          <Col xs={12}>
            <div className="edition-filter">
            <label className="control-label" htmlFor="results-edition">
              {this.props.t("edition.displayed")}
            </label>
            <EditionSelector onCallback={this.onEditionChange}
                             id="results-edition"
                             ariaLabel={this.props.t("edition.displayed")}
                             filter="has_results" />
            </div>
          </Col>
        </Row>
        <Row className="small-spacing" />
        <Row className="filter-buttons">
          <Col smOffset={3} sm={1} xs={2} xsOffset={1}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="web" />
            <p>{this.props.t("categories.web")}</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="educational" />
            <p>{this.props.t("categories.educational")}</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="roboti" />
            <p>{this.props.t("categories.robots")}</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="utilitar" />
            <p>{this.props.t("categories.utility")}</p>
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="multimedia" />
            <p>{this.props.t("categories.multimedia")}</p>
          </Col>
        </Row>
        <Row className="small-spacing" />
      </Grid>
      {this.renderTable()}
    </div>;
  },

  onEditionChange(edition) {
    this.setState({currentEdition: edition});
    this.showResults(edition.id);
  },

  showResults(editionId) {
    let data = editionId ? { edition: editionId } : {};

    this.setState({ isLoading: true, hasError: false });

    ajax({
      endpoint: "projects.json",
      data: data,
      success: (data) => {
        let projects = Array.isArray(data) ? data.map(normalizeProject) : [];
        this.setState({ projects: projects, isLoading: false, hasError: false });
      },
      error: () => {
        this.setState({ projects: [], isLoading: false, hasError: true });
      },
    });
  }
});

export default withTranslation("public")(Results);
