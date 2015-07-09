"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import {Link} from "react-router";
import {Grid, Row, Col, Glyphicon} from "react-bootstrap";

import Header from "./header";
import NewsContainer from "./news/news-container";

import "../main.less";
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
import CloudBase from "../../assets/img/sponsors/cloudbase.png";

export default React.createClass({
  displayName: "Home",

  render() {
    return <div className="home">
        <div className="blue-section-wrapper">
            <Grid className="blue-section">
                        <Header isLoggedIn={this.props.isLoggedIn}
                                login={this.props.login}
                                logout={this.props.logout} />
                <Row className="xxsmall-spacing" />
                <Row>
                    <Col>
                        <h1>
                            InfoEducație
                        </h1>
                        <h2>Concurs Național de Proiecte IT&amp;C</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className="tagline">
                            Ediția&nbsp;
                            {this.props.current.edition.year}
                        </h5>
                    </Col>
                </Row>
                <Row className="xxsmall-spacing" />
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
            </Grid>
        </div>

        <div className="green-section-wrapper">
          <NewsContainer />
        </div>

        <div className="gray-section-wrapper">
            <Grid className="gray-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={6} mdOffset={6}>
                        <h6>Alumnus</h6>
                        <Row className="small-spacing" />
                        <p className="quote">InfoEducatie mi-a oferit o
                         motivatie sa invat tehnologii web si sa dezvolt
                         proiectul meu de atunci. Am un sfat pentru
                         participanti: Prezentarea este la fel de importanta
                         ca lucrarea in sine! Repetati inainte sa veniti in
                         fata comisiei.</p>
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
                            <img src={Cisco} />
                            <img src={CloudBase} />
                        </p>
                    </Col>
                </Row>

                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h4>Sponsori Bronze</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <img src={EasyHost} />
                            <img src={Intuitext} />
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
