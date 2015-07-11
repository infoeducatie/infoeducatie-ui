"use strict";

import $ from "jquery";
import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";
import React from "react";

import "../main.less";
import Ajax from "../lib/ajax"
import DefaultAvatar from "../../assets/img/jury/default.png";
import EditionSelector from  "./edition-selector";
import Header from "./header";


export default React.createClass({
  displayName: "Talks",

  getInitialState() {
    return {
      talks: [],
      selectedEditionYear: this.props.edition.year
    };
  },

  componentDidMount() {
    this.getTalks();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.edition.year != this.props.edition.year) {
      this.setState({ selectedEditionYear: nextProps.edition.year });
    }
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
    return <div className="talks">
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
              <h2>Ediția {this.state.selectedEditionYear}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        <Row className="small-spacing" />
        <Row>
          <Col sm={4} smOffset={4}>
            <EditionSelector onCallback={this.onEditionChange} />
          </Col>
        </Row>
        {this.state.talks.map(this.renderSeminar)}
      </Grid>
   </div>;
  },

  onEditionChange(edition) {
    this.getTalks(edition.id);
    this.setState({ selectedEditionYear: edition.year });
  },

  getTalks(editionId=undefined) {
    let data = {};
    if (editionId) {
      data.edition = editionId;
    }

    Ajax("talks.json", (data) => {
      this.setState({talks: data});
    }, data);
  }
});
