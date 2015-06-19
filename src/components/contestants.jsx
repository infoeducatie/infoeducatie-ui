"use strict";

import React from "react";

import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import "./contestants.less";
import "./jury.less";


export default React.createClass({
  displayName: "Participanti",

  render() {
    return <div className="contestants">
        <div className="blue-section-wrapper">
          <Grid className="blue-section">
            <Header isLoggedIn={this.props.isLoggedIn} />
            <Row className="small-spacing" />
            <Row>
              <Col md={12}>
                <h1>Participanți InfoEducație Ediția 2015</h1>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h2>Concurs Național de Informatică</h2>
              </Col>
            </Row>
            <Row className="big-spacing" />
            <Row>
              <Col md={6} mdOffset={3} className="middle-align hidden-xs">
                <Row className="stats">
                  <Col md={4} xs={2} className="right-border">
                      <p className="description">Participanți</p>
                      <p className="value">75</p>
                  </Col>
                  <Col md={4} xs={2} className="right-border">
                      <p className="description">Proiecte</p>
                      <p className="value">39</p>
                  </Col>
                  <Col md={4} xs={2} >
                      <p className="description">Județe</p>
                      <p className="value">17</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
        <Row className="small-spacing" />
        <div className="white-section-wrapper">
          <Grid>
            <Row className="white-section">
              <Col md={1}>
                <div className="round-icon"><span className="educational"></span></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="media"></span></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="robots"></span></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="utility"></span></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="web"></span></div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>;
  }
});
