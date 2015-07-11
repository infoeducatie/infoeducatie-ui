"use strict";

import $ from "jquery";
import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";
import React from "react";

import "../main.less";
import DefaultAvatar from "../../assets/img/jury/default.png";
import EditionSelector from  "./edition-selector";
import Header from "./header";


export default React.createClass({
  displayName: "Talks",

  getInitialState() {
    return {
      talks: []
    };
  },

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: window.config.API_URL + "talks.json",
      success: this.onSuccess
    });
  },

  onSuccess(data) {
    this.setState({
      talks: data
    });
  },

  renderSeminar(talk, index) {
    let colors = ["green", "orange", "black"];
    let className = ctx("seminar-container", colors[index % colors.length]);
    let authorImage = "http://www.gravatar.com/avatar/" + talk.user.email_md5 + "?s=150&d=mysteryman";

    return <Row key={index}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10}>
        <Row className="xsmall-spacing" />
        <Row>
          <Col className={className} xs={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col xs={3} xsOffset={1}>
                <Row className="xsmall-spacing" />
                <div className="seminar-image">
                  <img src={authorImage} />
                </div>
              </Col>
              <Col xs={8} >
                <h4 className="seminar-title">{talk.title}</h4>
                <p>{talk.description}</p>
                <Row className="xsmall-spacing" />
                <h5 className="seminar-name">
                  {talk.user.first_name} &nbsp;
                  {talk.user.last_name}
                </h5>
                <h6>{talk.user.job}</h6>
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
              <h1>Seminarii InfoEducație</h1>
              <h2>Ediția {this.props.current.edition.year}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        <Row>
          <Col>
            <EditionSelector currentEditionId={this.props.edition.id}
                             onCallback={this.onEditionChange} />
          </Col>
        </Row>
        {this.state.talks.map(this.renderSeminar)}
      </Grid>
   </div>;
  }

  onEditionChange(editionId) {
    // TODO @palcu: implement this
  }
});
