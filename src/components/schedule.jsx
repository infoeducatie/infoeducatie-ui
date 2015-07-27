"use strict";

import React from "react";

import { Row, Col, Grid } from "react-bootstrap";
import Header from "./header";

import "./schedule.less";

export default React.createClass({
  displayName: "SchedulePage",

  render() {
    return <div className="schedule">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      language={this.props.language}
                      changeLanguage={this.props.changeLanguage}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Row className="small-spacing" />
            <Col xs={12}>
              <h1>Program InfoEduca&#355;ie </h1>
              <h2>Ediția {this.props.current.edition.name}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid className="white-section">
        <Row className="small-spacing" />
        <Row>
          <Col md={8} mdOffset={2}>
            <iframe src="https://docs.google.com/spreadsheets/d/1xUGzj0ar_6bluOhuz6poSG-34buiuMXi_PJb9LjDFuc/pubhtml?widget=true&amp;headers=false"></iframe>
          </Col>
        </Row>
      </Grid>
    </div>;
  }
});
