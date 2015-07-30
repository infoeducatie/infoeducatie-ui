"use strict";

import React from "react";
import { Grid, Col, Row, Table } from "react-bootstrap";

import ajax from "../lib/ajax"
import EditionSelector from "./edition-selector"
import FilterIcon from "./contestants/filter_icon";
import Header from "./header";
import resultsFixture from "../fixtures/results";

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
      results: resultsFixture
    };
  },

  componentDidMount() {
    this.showResults(this.state.currentEdition.id);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastEditionWithResults.id !==
        this.props.lastEditionWithResults.id) {

      this.setState({currentEdition: nextProps.lastEditionWithResults});
    }
  },

  toggleCategory(category) {
    this.setState({
      currentCategory: category
    });
  },

  renderTable() {
    return <Grid className="results-section">
      <Row>
        <Col md={8} mdOffset={2}>
          <Table responsive>
            <thead>
              <tr>
                <th>premiul</th>
                <th className="left">numele lucrării</th>
                <th className="left">concurent</th>
                <th className="left hidden-xs">liceu</th>
                <th className="hidden-xs">punctaj</th>
                <th className="hidden-xs">open</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.results[this.state.currentCategory].map(function(result) {
                return <tr key={result.project.id}>
                  <td className="rank">{result.rank}</td>
                  <td className="title">{result.project.name}</td>
                  <td>
                    <ul className="list-unstyled">
                      {result.project.authors.map(function(author){
                          return <li className="author" key={author.id}>
                            {author.name}
                          </li>;
                        })}
                    </ul>
                  </td>
                  <td className="hidden-xs">{result.project.school}</td>
                  <td className="hidden-xs score">{result.project.score}</td>
                  <td className="hidden-xs score">{result.project.open}</td>
                  <td className="score">{result.project.total}</td>
                </tr>;
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Grid>;
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
        <Row className="small-spacing"  />
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

  showResults(edition) {
    console.log(edition)
    // TODO @palcu: ajax + setState
  }
});
