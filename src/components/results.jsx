"use strict";

import React from "react";
import { Grid, Col, Row, Glyphicon } from "react-bootstrap";

import Header from "./header";

import "./results.less";


export default React.createClass({
  displayName: "Results",


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
    </div>;
  }
});
