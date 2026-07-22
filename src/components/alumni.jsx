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
      alumni: [],
      hasErrored: false,
      isLoading: true
    };
  },

  componentDidMount() {
    request({
      method: "GET",
      url: window.config.API_URL + "alumni.json",
      success: this.onSuccess,
      error: this.onError
    });
  },

  onSuccess(data) {
    this.setState({
      alumni: data,
      isLoading: false
    });
  },

  onError() {
    this.setState({ hasErrored: true, isLoading: false });
  },

  renderAlumnus(alumnus, index) {
    let colors = ["green", "orange", "black"];
    let className = ctx("alumnus-container", colors[index % colors.length]);
    let editions = alumnus.editions.map(function(edition) {
                      return parseInt(edition.name);
                   });

    return <Row className="alumnus-row" key={index}>
      <Col mdOffset={1} md={10} smOffset={1} sm={10}>
        <article className={className}>
          <div className="alumnus-image">
            <img
              alt=""
              height="150"
              loading="lazy"
              src={gravatar(alumnus.user.email_md5)}
              width="150"
            />
          </div>
          <div className="alumnus-copy">
            <p className="alumnus-description">{alumnus.description}</p>
            <h2 className="alumnus-name">
              {alumnus.user.first_name} {alumnus.user.last_name}
            </h2>
            <p className="alumnus-position">{alumnus.user.job}</p>
            <p className="alumnus-editions" aria-label="Ediții participante">
              {editions.sort().reverse().map(function(edition) {
                return <span key={edition}>{edition}</span>;
              })}
            </p>
          </div>
        </article>
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
        {this.state.isLoading ? <p className="page-status" role="status">Se încarcă alumni...</p> : null}
        {this.state.hasErrored ? <p className="page-status alert alert-warning" role="alert">Lista alumni nu poate fi încărcată momentan.</p> : null}
        {this.state.alumni.map(this.renderAlumnus)}
      </Grid>
   </div>;
  }
});
