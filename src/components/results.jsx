"use strict";

import React from "react";
import { Grid, Col, Row, Table } from "react-bootstrap";

import Header from "./header";
import FilterIcon from "./contestants/filter_icon";
import resultsFixture from "../fixtures/results";

import "./results.less";


export default React.createClass({
  displayName: "Results",

  getInitialState: function() {
    return {
      currentCategory: "robots",
      results: resultsFixture
    };
  },

  toggleCategory(category) {
    this.setState({
      currentCategory: category
    });
  },

  renderTable() {
    return <Grid className="results-section">
      <Row>
        <Col>
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
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row className="xsmall-spacing" />
          <Row>
            <Col>
              <h1>Rezultate InfoEducație</h1>
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

      <Grid>
        <Row className="small-spacing" />
        <Row className="filter-buttons">
          <Col smOffset={3} sm={1} xs={2} xsOffset={1}>
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
        </Row>
        <Row className="small-spacing" />
      </Grid>
      {this.renderTable()}
    </div>;
  }
});
