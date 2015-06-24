"use strict";

import React from "react";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./alumni.less";


export default React.createClass({
  displayName: "Alumni",

   render() {
     return <div className="home">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col md={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h1>Alumni InfoEducație</h1>
              <h2>Generația IT din România</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
    </div>;
   }
});
