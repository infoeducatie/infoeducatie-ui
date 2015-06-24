"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import "./register.less";


export default React.createClass({
  displayName: "Register",

  render() {
    return <div className="register">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row>
            <Col md={12}>
              <h1>Înregistrare</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Momentan nu se pot face înregistrări.</h2>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>;
  }
});
