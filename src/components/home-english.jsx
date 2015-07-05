"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import {Link} from "react-router";
import {Grid, Row, Col, Glyphicon} from "react-bootstrap";

import Header from "./header";
import NewsContainer from "./news/news-container";

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

  render() {
    return <div className="home">
        <div className="blue-section-wrapper">
            <Grid className="blue-section">
                <Row>
                    <Col>
                        <Header isLoggedIn={this.props.isLoggedIn}
                                language={this.props.language}
                                changeLanguage={this.props.changeLanguage}
                                login={this.props.login}
                                logout={this.props.logout} />
                    </Col>
                </Row>
                <Row className="big-spacing header-spacing" />
                <Row>
                    <Col>
                        <h1>
                            InfoEducație &nbsp;
                            {this.props.current.edition.year}
                        </h1>
                        <h2>National Contest of Computer Science Projects</h2>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col md={4} mdOffset={4}>
                        <p className="right-button">
                            <Link to="about" className="link link-secondary">
                                About contest
                            </Link>
                        </p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row className="statistics">
                    <Col md={2} mdOffset={3} xs={4}>
                        <p className="description">Contestants</p>
                        <p className="value">
                          {this.props.current.stats.total_participants}
                        </p>
                    </Col>
                    <Col md={2} xs={4}>
                        <p className="description">Projects</p>
                        <p className="value">
                          {this.props.current.stats.total_projects}
                        </p>
                    </Col>
                    <Col md={2} xs={4}>
                        <p className="description">Counties</p>
                        <p className="value">
                          {this.props.current.stats.total_counties}
                        </p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
            </Grid>
        </div>

        <div className="gray-section-wrapper">
            <Grid className="gray-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={6} mdOffset={6}>
                        <h6>Alumnus</h6>
                        <Row className="small-spacing" />
                        <p className="quote">At that time it seems to be just
                        a game, but now, infoarena is an mature organization
                        with a strong impact between young people, pasionate
                        about computer science.
                        </p>
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
                            <h1>Gălăciuc Camp</h1>
                            <h6 className="data">
                                <span className="pink-dash"></span>
                                2 - 8 August 2015
                                <span className="pink-dash"></span>
                            </h6>
                            <h6 className="edition">23th Edition</h6>
                            <Row className="small-spacing" />
                            <p>
                                <Link to="photos"
                                   className="link link-secondary">
                                    More pictures
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
                        <h4>Gold Sponsors</h4>
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
                        <h4>Silver Sponsors</h4>
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
                        <h4>Educational Partners</h4>
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
