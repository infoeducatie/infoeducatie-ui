"use strict";

import request from "@lib/request";

import _ from "lodash";
import createLegacyComponent from "@lib/create-legacy-component";
import {Grid, Row, Col, Glyphicon} from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import Article from "./article";
import "../../main.less";


const NewsContainer = createLegacyComponent({
  displayName: "NewsContainer",

  getInitialState() {
    return {
      currentPage: 1,
      newsPerPage: 2,
      canShowNext: false,
      canShowPrevious: false,
      hasError: false,
      isLoading: true,
      news: [],
      pinned: null
    };
  },

  componentDidMount() {
    this.loadNews();
  },

  loadNews() {
    this.setState({ hasError: false, isLoading: true });

    request({
      method: "GET",
      url: window.config.API_URL + "news.json",
      success: this.onSuccess,
      error: this.onError,
    });
  },

  onSuccess(data) {
    if (!Array.isArray(data)) {
      this.onError();
      return;
    }

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
      canShowNext: news.length > this.state.newsPerPage,
      hasError: false,
      isLoading: false,
    });
  },

  onError() {
    this.setState({ hasError: true, isLoading: false });
  },

  renderStatus() {
    if (this.state.isLoading) {
      return <p className="news-status" role="status">
        {this.props.t("news.loading")}
      </p>;
    }

    if (this.state.hasError) {
      return <div className="news-status" role="alert">
        <p>{this.props.t("news.error")}</p>
        <button className="news-retry" onClick={this.loadNews} type="button">
          {this.props.t("news.retry")}
        </button>
      </div>;
    }

    if (!this.state.pinned && !this.state.news.length) {
      return <p className="news-status" role="status">
        {this.props.t("news.empty")}
      </p>;
    }

    return null;
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
      return <Article key={article.id}
                      body={article.body}
                      title={article.title}
                      short={article.short}
                      created_at={article.created_at} />;
    });
  },

  renderPreviousPageLink() {
    let previousPageController = null;
    if (this.state.canShowPrevious) {
      previousPageController = <button className="pagination-icon"
                                    type="button"
                                    onClick={this.showPreviousNewsPage}>
                                 <Glyphicon glyph="chevron-left" />
                                 &nbsp;{this.props.t("news.previous")}
                               </button>;
    }

    return <Col md={4} mdOffset={2}>{previousPageController}</Col>;
  },

  renderNextPageLink() {
    let nextPageController = null;
    if (this.state.canShowNext) {
      nextPageController = <button className="pagination-icon"
                                type="button"
                                onClick={this.showNextNewsPage}>
                             {this.props.t("news.next")} &nbsp;
                             <Glyphicon glyph="chevron-right" />
                           </button>;
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
              <h2 className="section-heading" id="news">{this.props.t("news.title")}</h2>
              {this.renderStatus()}
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

export default withTranslation("public")(NewsContainer);
