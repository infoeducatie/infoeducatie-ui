"use strict";

import _ from "lodash";
import React from "react";
import { Grid, Col, Row, Table } from "react-bootstrap";

import ajax from "../lib/ajax"
import EditionSelector from "./edition-selector"
import FilterIcon from "./contestants/filter_icon";
import Header from "./header";

import "../main.less";


export default React.createClass({
  displayName: "Results",

  getInitialState: function() {
    return {
      currentCategory: "web",
      currentEdition: {
        id: 0,
        name: ""
      },
      projects: []
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastEditionWithResults.id !==
        this.props.lastEditionWithResults.id) {

      this.setState({currentEdition: nextProps.lastEditionWithResults});
      this.showResults(nextProps.lastEditionWithResults.id);
    }
  },

  componentDidMount() {
    if (this.state.currentEdition !== 0) {
      this.showResults(this.props.lastEditionWithResults.id);
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

    // TODO @palcu: remove hack for absent contestants
    projects = projects.map((project) => {
      if (project.prize && project.prize.length > 3) {
        project.prize = "";
      }
      return project;
    });

    // TODO @palcu: remove hack and get
    projects = projects.map((project) => {
      project.contestants = project.contestants.map((contestant) => {
        return contestant.name;
      });
      return project;
    });

    // We want entire rows to be clickable AND have a elements in them.
    return <Grid className="results-section">
      <Row>
        <Col md={12}>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>premiul</th>
                <th className="left">numele lucrării</th>
                <th className="left">concurent</th>
                <th className="left hidden-sm hidden-xs">liceu</th>
                <th className="left hidden-sm hidden-xs">județ</th>
                <th className="left hidden-sm hidden-xs">profesor</th>
                <th className="hidden-sm hidden-xs">punctaj</th>
                <th className="hidden-sm hidden-xs">open</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(function(project) {
                return <tr key={project.id}>
                  {this.renderTableTd(project.prize, project.discourse_url, "rank")}
                  {this.renderTableTd(project.title, project.discourse_url)}
                  {this.renderTableUl(project.contestants,
                                      project.discourse_url,
                                      "",
                                      "author")}
                  {this.renderTableUl(project.schools,
                                      project.discourse_url,
                                      "hidden-sm hidden-xs",
                                      "school-name")}
                  {this.renderTableUl(project.counties,
                                      project.discourse_url,
                                      "hidden-sm hidden-xs",
                                      "county")}
                  {this.renderTableUl(project.mentoring_teachers,
                                      project.discourse_url,
                                      "hidden-sm hidden-xs",
                                      "county")}
                  {this.renderTableTd(project.score,
                                      project.discourse_url,
                                      "hidden-sm hidden-xs score")}
                  {this.renderTableTd(project.extra_score,
                                      project.discourse_url,
                                      "hidden-sm hidden-xs score")}
                  {this.renderTableTd(project.score,
                                      project.discourse_url,
                                      "score")}
                </tr>;
              }.bind(this))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Grid>;
  },

  renderTableTd(content, url, tdClassName) {
    return (
      <td className={tdClassName}>
        <a href={url}>
          {content}
        </a>
      </td>
    );
  },

  renderTableUl(items, url, tdClassName, liClassName) {
    return (
      <td className={tdClassName}>
        <ul className="list-unstyled">
          {items.map(function(item){
            return <li key={item} className={liClassName}>
              <a href={url}>
                {item}
              </a>
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
                  language={this.props.language}
                  changeLanguage={this.props.changeLanguage}
                  login={this.props.login}
                  logout={this.props.logout} />
          <Row className="xsmall-spacing" />
          <Row>
            <Col>
              <h1>Rezultate InfoEducație</h1>
              <h2>{this.state.currentEdition.name}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>

      <Grid>
        <Row className="small-spacing" />
        <Row>
          <Col sm={4} smOffset={4}>
            <EditionSelector onCallback={this.onEditionChange}
                             filter="has_results" />
          </Col>
        </Row>
        <Row className="small-spacing" />
        <Row className="filter-buttons">
          <Col smOffset={3} sm={1} xs={2} xsOffset={1}>
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

  showResults() {
    // TODO @palcu: this receives editionId and we should use it
    ajax({
      endpoint: "projects.json",
      success: (data) => {
        this.setState({ projects: data });
      }
    });
  }
});
