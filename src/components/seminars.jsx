"use strict";

import React from "react";

import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./seminars.less";
import seminarFixtures from "../fixtures/seminars";


export default React.createClass({
  displayName: "Seminars",

  getInitialState() {
    return {
      seminars: seminarFixtures
    };
  },

  renderSeminar(seminar) {
    let className = ctx("seminar-container", seminar.color);

    return <Row key={seminar.id}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10} xs={12}>
        <Row className="xsmall-spacing" />
        <Row>
          <Col className={className} xs={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col xs={3} xsOffset={1}>
                <Row className="small-spacing" />
                <div className="seminar-image">
                  <img src={seminar.lector.avatar} />
                </div>
              </Col>
              <Col xs={8} >
                <h4 className="seminar-title">{seminar.title}</h4>
                <p>{seminar.description}</p>
                <Row className="xsmall-spacing" />
                <h5 className="seminar-name">{seminar.lector.name}</h5>
                <p className="seminar-position">{seminar.lector.position}</p>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
      </Col>
    </Row>;
  },

  render() {
    return <div className="seminars">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h1>Seminarii InfoEducație <br />
                  Ediția {this.props.current.edition.year}
              </h1>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        {this.state.seminars.map(this.renderSeminar)}
      </Grid>
   </div>;
  }
});
