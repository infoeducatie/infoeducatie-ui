"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import {Link} from "react-router";
import {Grid, Row, Col, Glyphicon} from "react-bootstrap";

import Article from "./article";
import "../../main.less";


export default React.createClass({
  displayName: "NewsContainer",

  getInitialState() {
    return {
      currentPage: 1,
      newsPerPage: 2,
      canShowNext: false,
      canShowPrevious: false,
      news: [],
      pinned: null
    };
  },

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: window.config.API_URL + "news.json",
      success: this.onSuccess
    });
  },

  onSuccess(data) {
    let news = data.filter((article) => {
      return !article.pinned;
    });

    let pinned = _.difference(data, news);
    if (!pinned.length) {
      pinned = news.slice(0, 1);
      news = news.slice(1);
    }

    this.setState({
      news: news,
      pinned: pinned[0],
      canShowNext: news.length > this.state.newsPerPage
    });
  },

  canShowNextPage() {
    return ((this.state.currentPage + 1) * this.state.newsPerPage) <
            this.state.news.length;
  },

  canShowPreviousPage() {
    return this.state.currentPage - 1 > 1;
  },

  showNextNewsPage() {
    this.setState({
      currentPage: this.state.currentPage + 1,
      canShowNext: this.canShowNextPage(),
      canShowPrevious: true
    });
  },

  showPreviousNewsPage() {
    this.setState({
      currentPage: this.state.currentPage - 1,
      canShowPrevious: this.canShowPreviousPage(),
      canShowNext: true
    });
  },

  renderNews() {
    let firstArticle = (this.state.currentPage - 1) * this.state.newsPerPage;
    let news = _.clone(this.state.news).splice(firstArticle, this.state.newsPerPage);

    return news.map(function(article) {
      return <Article body={article.body}
                      title={article.title}
                      short={article.short}
                      created_at={article.created_at} />;
    });
  },

  renderPreviousPageLink() {
    let previousPageController = null;
    if (this.state.canShowPrevious) {
      previousPageController = <div className="pagination-icon"
                                    onClick={this.showPreviousNewsPage}>
                                 <Glyphicon glyph="chevron-left" />
                                 &nbsp;anterioare
                               </div>;
    }

    return <Col md={4} mdOffset={2}>{previousPageController}</Col>;
  },

  renderNextPageLink() {
    let nextPageController = null;
    if (this.state.canShowNext) {
      nextPageController = <div className="pagination-icon"
                                onClick={this.showNextNewsPage}>
                             următoare &nbsp;
                             <Glyphicon glyph="chevron-right" />
                           </div>;
    }

    return <Col md={4}>{nextPageController}</Col>;
  },

  renderPinnedArticle() {
    if (!this.state.pinned) {
      return null;
    }

    return <Row className="pinned-news">
      <Article body={this.state.pinned.body}
               title={this.state.pinned.title}
               short={this.state.pinned.short}
               created_at={this.state.pinned.created_at} />
    </Row>;
  },

  render() {
    return <Grid className="news-section">
      <Row>
          <Col xsOffset={1} xs={10} md={5} className="left">
              <Row className="xsmall-spacing" />
              <h6 id="news">Știri</h6>
              {this.renderPinnedArticle()}
          </Col>
          <Col xsOffset={1} xs={10} md={5} mdOffset={1} className="right">
            {this.renderNews()}
            <Row className="xsmall-spacing" />
            <Row>
              {this.renderPreviousPageLink()}
              {this.renderNextPageLink()}
            </Row>
          </Col>
      </Row>
      <Row className="xsmall-spacing" />
    </Grid>;
  }
});
