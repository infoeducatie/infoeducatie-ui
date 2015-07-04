"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import {Link} from "react-router";
import {Grid, Row, Col, Glyphicon} from "react-bootstrap";

import Header from "./header";
import Article from "./article";

import "./home.less";
import Google from "../../assets/img/sponsors/google.png";
import Intel from "../../assets/img/sponsors/intel.png";
import Orange from "../../assets/img/sponsors/orange.png";
import EasyHost from "../../assets/img/sponsors/easyhost.png";
import Cisco from "../../assets/img/sponsors/cisco.png";
import Intuitext from "../../assets/img/sponsors/intuitext.gif";
import Apdetic from "../../assets/img/sponsors/apdetic.png";
import TotalSoft from "../../assets/img/sponsors/totalsoft.gif";
import Upir from "../../assets/img/sponsors/upir.png";
import MEN from "../../assets/img/sponsors/edu.jpg";


export default React.createClass({
  displayName: "Home",

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
    return <div className="home">
        <div className="blue-section-wrapper">
            <Grid className="blue-section">
                <Row>
                    <Col>
                        <Header isLoggedIn={this.props.isLoggedIn}
                                login={this.props.login}
                                logout={this.props.logout} />
                    </Col>
                </Row>
                <Row className="big-spacing header-spacing" />
                <Row>
                    <Col>
                        <h1>
                            InfoEducație Ediția&nbsp;
                            {this.props.current.edition.year}
                        </h1>
                        <h2>Concurs Național de Informatică</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className="tagline">
                            {this.props.current.edition.motto}
                        </h5>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col md={4} mdOffset={2}>
                        <p className="left-button">
                            <Link to={'register'} className="link link-primary">
                                Înregistrează-te
                            </Link>
                        </p>
                    </Col>
                    <Col md={4}>
                        <p className="right-button">
                            <Link to="about" className="link link-secondary">
                                Despre concurs
                            </Link>
                        </p>
                    </Col>
                </Row>
                <Row className="big-spacing" />
                <Row className="statistics">
                    <Col md={2} mdOffset={3} xs={4}>
                        <p className="description">Participanți</p>
                        <p className="value">250+</p>
                    </Col>
                    <Col md={2} xs={4}>
                        <p className="description">Proiecte</p>
                        <p className="value">120+</p>
                    </Col>
                    <Col md={2} xs={4}>
                        <p className="description">Județe</p>
                        <p className="value">35+</p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
            </Grid>
        </div>

        <div className="green-section-wrapper">
            <Grid className="green-section">
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
            </Grid>
        </div>

        <div className="gray-section-wrapper">
            <Grid className="gray-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={6} mdOffset={6}>
                        <h6>Alumnus</h6>
                        <Row className="small-spacing" />
                        <p className="quote">La momentul respectiv părea o
                        joacă, acum infoarena este o organizație cu o
                        activitate foarte solidă și cu un impact mare în
                        rândul elevilor pasionați de informatică.</p>
                        <Row className="small-spacing" />
                        <h2 className="alumnus-name">Cristian Strat</h2>
                        <h6 className="alumnus-position">
                            Ex Growth Manager @ Twitter
                        </h6>
                    </Col>
                </Row>
                <Row className="small-spacing" />
            </Grid>
        </div>

        <div className="yellow-section-wrapper">
            <div className="yellow-section container-fluid">
                <Row>
                    <Col md={4} mdOffset={2} className="text middle-align">
                        <div className="wrapper-for-flexbox">
                            <h1>Tabăra Gălăciuc</h1>
                            <h6 className="data">
                                <span className="pink-dash"></span>
                                2 - 8 August 2015
                                <span className="pink-dash"></span>
                            </h6>
                            <h6 className="edition">Ediția 23</h6>
                            <Row className="small-spacing" />
                            <p>
                                <Link to="photos"
                                   className="link link-secondary">
                                    Mai multe poze
                                </Link>
                            </p>
                        </div>
                    </Col>
                    <Col md={6} className="grass" />
                </Row>
            </div>
        </div>

        <div className="sponsors-section-wrapper">
            <Grid className="sponsors-section">
                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h4>Sponsori Gold</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <img src={Google} />
                            <img src={Intel} />
                            <img src={Orange} />
                        </p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h4>Sponsori Silver</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <img src={EasyHost} />
                            <img src={Cisco} />
                            <img src={Intuitext} /> <br />
                            <img src={Apdetic} />
                            <img src={TotalSoft} />
                        </p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h4>Parteneri Educaționali</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <img src={Upir} />
                            <img src={MEN} />
                        </p>
                    </Col>
                </Row>
            </Grid>
        </div>
    </div>;
  }
});
