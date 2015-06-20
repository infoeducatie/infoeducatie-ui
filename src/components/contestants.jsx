"use strict";

import React from "react";

import { Grid, Col, Row, Glyphicon } from "react-bootstrap";
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
        <Row className="big-spacing" />
        <div className="white-section-wrapper">
          <Grid>
            <Row className="white-section">
              <Col mdOffset={2} md={1}>
                <div className="round-icon"><span className="educational"></span></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="media" /></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="robots" /></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="utility" /></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="web" /></div>
              </Col>
              <Col mdOffset={2} md={1}>
                <Glyphicon glyph='th-large' className="icon" />
              </Col>
              <Col md={1}>
                <Glyphicon glyph='align-justify' className="icon" />
              </Col>
            </Row>
          </Grid>
          <Grid>
            <Row className="white-section">
              <Col mdOffset={1} md={8}>
                <div className="item">
                  <div className="participant-container">
                    <Row className="big-spacing"></Row>
                    <Row className="project-title">Time Travel</Row>
                    <Row className="big-spacing"></Row>
                    <Row className="project-details">
                      <Col md={12}>
                        <div className="author">claudia rujoiu</div>
                        <div className="author">dan stoian</div>
                        <Row className="large-spacing"></Row>
                        <Row>
                          <Col md={1}>
                            <Glyphicon inverse glyph='map-marker' className="icon" />
                          </Col>
                          <Col md={6}>
                            hunedoara
                          </Col>
                          <Col md={1} mdOffset={2}>
                            7
                          </Col>
                        </Row>
                        <Row className="big-spacing"></Row>
                      </Col>
                    </Row>
                  </div>
                  <Row className="orange-section utility">
                    <Col md={12} >
                      <Row className="big-spacing"></Row>
                      <Row>
                        <Col md={4} mdOffset={1}>
                          utilitar
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                <div className="item">
                  <div className="well">
                  1 blah blah blah
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>;
  }
});
