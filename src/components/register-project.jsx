"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import "./register-project.less";

export default React.createClass({
  displayName: "RegisterProjectPage",

  render() {
    return <div className="register-project">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row>
            <Col>
              <h1>Înregistrează un proiect</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Te rugăm să completezi acest formular cu grijă</h2>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>;
  }
});
