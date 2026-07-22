"use strict";

import request from "@lib/request";

import createLegacyComponent from "@lib/create-legacy-component";

import ctx from "classnames";
import {Grid, Row, Col} from "@ui/bootstrap";

import gravatar from "../lib/gravatar";
import Header from "./header";

import "../main.less";


export default createLegacyComponent({
  displayName: "Alumni",

  getInitialState() {
    return {
      alumni: []
    };
  },

  componentDidMount() {
    request({
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
    let editions = alumnus.editions.map(function(edition) {
                      return parseInt(edition.name);
                   });

    return <Row key={index}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10}>
        <Row className="xsmall-spacing" />
        <Row>
          <Col className={className} xs={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col className="alumnus-portrait" md={3}>
                <Row className="xsmall-spacing" />
                <div className="alumnus-image">
                  <img
                    alt=""
                    height="150"
                    loading="lazy"
                    src={gravatar(alumnus.user.email_md5)}
                    width="150"
                  />
                </div>
              </Col>
              <Col className="alumnus-copy" md={9}>
                <p>{alumnus.description}</p>
                <Row className="xsmall-spacing" />
                <h2 className="alumnus-name">
                  {alumnus.user.first_name} &nbsp;
                  {alumnus.user.last_name}
                </h2>
                <p className="alumnus-position">{alumnus.user.job}</p>
                <p className="alumnus-editions">
                  {editions.sort().reverse().map(function(edition) {
                    return <span key={edition}>{edition}</span>;
                  })}
                </p>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
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
                      current={this.props.current}
                      language={this.props.language}
                      changeLanguage={this.props.changeLanguage}
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
