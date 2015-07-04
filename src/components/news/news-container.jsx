"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import {Link} from "react-router";
import {Grid, Row, Col, Glyphicon} from "react-bootstrap";

import Article from "./article";
import "./news.less"


export default React.createClass({
  displayName: "NewsContainer",

  getInitialState() {
    return {
      hasError: false,
      currentNewsPage: 1,
      newsPerPage: 2,
      canShowNext: false,
      canShowPrevious: false,
      news: []
    };
  },

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: window.config.API_URL + "news.json",
      success: this.onSuccess,
      error: this.onError
    });
  },

  onError() {
    this.setState({
      hasError: true
    });
  },

  onSuccess(data) {
    this.setState({
      news: data
    });
  },

  canShowNextPage() {
    return ((this.state.currentNewsPage + 1) * this.state.newsPerPage) <
            this.state.news.length;
  },

  canShowPreviousPage() {
    return this.state.currentNewsPage - 1 > 1;
  },

  showNextNewsPage() {
    if (this.state.currentNewsPage * this.state.newsPerPage <
        this.state.news.length) {
      this.setState({
        currentNewsPage: this.state.currentNewsPage + 1,
        canShowNext: this.canShowNextpage(),
        canShowPrevious: true
      });
    } else {
      this.setState({
        canShowNext: false,
        canShowPrevious: this.canShowPreviousPage()
      });
    }
  },

  showPreviousNewsPage() {
    if (this.state.currentNewsPage > 1) {
      this.setState({
        currentNewsPage: this.state.currentNewsPage - 1,
        canShowPrevious: this.canShowPreviousPage(),
        canShowNext: true
      });
    } else {
      this.setState({
        canShowPrevious: false,
        canShowNext: this.canShowNextPage()
      });
    }
  },

  renderNews() {
    let firstArticle = (this.state.currentNewsPage - 1) * this.state.newsPerPage;
    let news = _.clone(this.state.news).splice(firstArticle, this.state.newsPerPage);

    return news.map(function(article) {
      return <Article body={article.body}
                      title={article.title}
                      short_description={article.short_description}
                      created_at={article.created_at} />;
    });
  },

  render() {
    return <Grid className="news-section">
      <Row>
          <Col md={5} className="left">
              <Row className="xsmall-spacing" />
              <h6 id="news">Știri</h6>
              <Row className="xsmall-spacing" />

              <Row className="pinned-news">
                <p className="date">28 iunie 2015</p>
                <p className="title">Anul acesta InfoEducație aaaa</p>

                <p className="message">Vă invităm să ne oferiți feedback
                pe <a href="http://community.infoeducatie.ro/t/noul-website-infoeducatie-2015/3646">forum</a>.</p>
              </Row>
          </Col>
          <Col md={5} mdOffset={1} className="right">
            {this.renderNews()}
            <Row className="xsmall-spacing" />
            <Row>
              <Col md={4} mdOffset={2}>
                {this.state.canShowPrevious ?
                  <div className="pagination-icon"
                     onClick={this.showPreviousNewsPage}>
                  <Glyphicon glyph="chevron-left" />
                  &nbsp;anterioare
                </div> : null}
              </Col>
              <Col md={4}>
                {this.state.canShowNext ?
                  <div className="pagination-icon"
                     onClick={this.showNextNewsPage}>
                  următoare &nbsp;
                  <Glyphicon glyph="chevron-right" />
                </div> : null}
              </Col>
            </Row>
          </Col>
      </Row>
      <Row className="xsmall-spacing" />
    </Grid>;
  }
});
