"use strict";

import $ from "jquery";
import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";
import React from "react";

import "../main.less";
import ajax from "../lib/ajax"
import gravatar from "../lib/gravatar"
import DefaultAvatar from "../../assets/img/jury/default.png";
import EditionSelector from "./edition-selector";
import Header from "./header";

import DiscourseMixin from "../mixins/discourse"

export default React.createClass({
  displayName: "Talks",
  mixins: [DiscourseMixin],

  getInitialState() {
    return {
      talks: [],
      selectedEdition: this.props.edition.name
    };
  },

  componentDidMount() {
    this.getTalks();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.edition.name !== this.props.edition.name) {
      this.setState({ selectedEdition: nextProps.edition.name });
    }
  },

  canRenderEdition(edition) {
    return edition.talks_count > 0;
  },

  render() {
    return <div className="talks">
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
            <Col xs={12}>
              <h1>Seminarii InfoEducație</h1>
              <h2>Ediția {this.state.selectedEdition}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        <Row className="small-spacing" />
        <Row>
          <Col sm={4} smOffset={4}>
            <EditionSelector onCallback={this.onEditionChange}
                             canRenderEdition={this.canRenderEdition} />
          </Col>
        </Row>
        {this.state.talks.map(this.renderTalk)}
      </Grid>
   </div>;
  },

  renderTalk(talk, index) {
    let colors = ["green", "orange", "black"];
    let className = ctx("talk-container", colors[index % colors.length]);

    return <Row key={index}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10}>
        <Row className="xsmall-spacing" />
        <Row onClick={this.openDiscourse.bind(this, talk.discourse_url)}>
          <Col className={className} xs={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col xs={3} xsOffset={1}>
                <Row className="xsmall-spacing" />
                <ul className="list-inline">
                  {talk.users.map(this.renderAuthorImage)}
                </ul>
              </Col>
              <Col xs={8} >
                <h4 className="talk-title">{talk.title}</h4>
                <p>{talk.description}</p>

                <Row className="xsmall-spacing" />

                <ul className="list-unstyled">
                  {talk.users.map(this.renderAuthorText)}
                </ul>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
      </Col>
    </Row>;
  },

  renderAuthorImage(author, index) {
    return <li className="author-image" key={index}>
      <img src={gravatar(author.email_md5)} />
    </li>;
  },

  renderAuthorText(author, index) {
    return <li key={index} className="author-text">
      <h5 className="author-name">{author.name}</h5>
      <p className="author-job">{author.job}</p>
    </li>;
  },

  onEditionChange(edition) {
    this.getTalks(edition.id);
    this.setState({ selectedEdition: edition.name });
  },

  getTalks(editionId=undefined) {
    let data = {};
    if (editionId) {
      data.edition = editionId;
    }

    ajax({
      endpoint: "talks.json",
      data: data,
      success: (data) => { this.setState({ talks: data }); }
    });
  }
});
