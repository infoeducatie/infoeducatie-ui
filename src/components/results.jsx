"use strict";

import React from "react";
import { Grid, Col, Row, Glyphicon } from "react-bootstrap";

import Header from "./header";
import FilterIcon from "./contestants/filter_icon";

import "./results.less";


export default React.createClass({
  displayName: "Results",

  getInitialState: function() {
    return {
      currentCategory: "educational",
      results: {
        web: [
          { rank: "I",
            project: {
              id: 1,
              name: "Quizrl",
              authors: [{id: 1, name: "Lacătușu Casian"}],
              school: "Colegiul Național Traian",
              score: 68.43,
              open: 78.96,
              total: 73.70
            }
          },
          { rank: "II",
            project: {
              id: 2,
              name: "Nexus Play",
              authors: [{id: 2, name: "Cristian Alexandru"},
                        {id: 3, name: "Ghinea Diana-Elena"}],
              school: "Colegiul Național de Informatică „Tudor Vianu”",
              score: 68.21,
              open: 78.11,
              total: 73.16
            }
          },
          { rank: "III",
            project: {
              id: 3,
              name: "Locatia Mea",
              authors: [{id: 4, name: "Cozloschi Florin"}],
              school: "Liceul Teoretic 'Traian Vuia' Faget",
              score: 67.93,
              open: 75.54,
              total: 71.74
            }
          }
        ]
      }
    };
  },

  toggleCategory(category) {
    this.setState({
      currentCategory: category
    });
  },

  renderTable() {
    return <Grid>
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
      </Grid>
      {this.renderTable()}
    </div>;
  }
});
