"use strict";

import React from "react";

import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./alumni.less";
import DefaultAvatar from "../../assets/img/jury/default.png";


export default React.createClass({
  displayName: "Alumni",

  getInitialState() {
    return {
      alumni: []
    };
  },

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: window.config.API_URL + "alumni.json",
      success: this.onSuccess
    });
  },

  onSuccess(data) {
    this.setState({
      alumni: data
    });
  },

  renderAlumnus(alumnus, index) {
    let colors = ["green", "orange", "black"];
    let className = ctx("alumnus-container", colors[index % colors.length]);

    return <Row key={index}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10}>
        <Row className="small-spacing" />
        <Row>
          <Col className={className} xs={12}>
            <Row className="small-spacing" />
            <Row>
              <Col xs={3} xsOffset={1}>
                <Row className="xsmall-spacing" />
                <div className="alumnus-image">
                  <img src={DefaultAvatar} />
                </div>
              </Col>
              <Col xs={7} xsOffset={1}>
                <p>{alumnus.description}</p>
                <Row className="small-spacing" />
                <h5 className="alumnus-name">{alumnus.name}</h5>
              </Col>
            </Row>
            <Row className="small-spacing" />
          </Col>
        </Row>
      </Col>
    </Row>;
  },

  render() {
    return <div className="alumni">
      <div className="gray-section-wrapper">
        <Grid className="gray-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h1>Alumni InfoEducație</h1>
              <h2>Generația IT din România</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        {this.state.alumni.map(this.renderAlumnus)}
      </Grid>
   </div>;
  }
});
