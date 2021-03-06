"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import {Link} from "react-router";
import {Grid, Row, Col, Glyphicon} from "react-bootstrap";

import countify from "../../lib/countify";
import Header from "../header";

import "../home.less";
import Google from "../../../assets/img/sponsors/google.png";
import Intel from "../../../assets/img/sponsors/intel.png";
import Orange from "../../../assets/img/sponsors/orange.png";
import EasyHost from "../../../assets/img/sponsors/easyhost.png";
import Cisco from "../../../assets/img/sponsors/cisco.png";
import Intuitext from "../../../assets/img/sponsors/intuitext.gif";
import Apdetic from "../../../assets/img/sponsors/apdetic.png";
import Upir from "../../../assets/img/sponsors/upir.png";
import MEN from "../../../assets/img/sponsors/edu.jpg";
import CloudBase from "../../../assets/img/sponsors/cloudbase.png";
import iMedicare from "../../../assets/img/sponsors/imedicare.png";
import eSkills from "../../../assets/img/sponsors/eskills.png";
import gwc from "../../../assets/img/sponsors/girlswhocode.png";
import leonte from "../../../assets/img/sponsors/leonte.png";
import altex from "../../../assets/img/sponsors/altex.gif";
import MTS from "../../../assets/img/sponsors/mts.jpg";

export default React.createClass({
  displayName: "Home",

  componentDidMount() {
    this.props.refreshCurrent();
    this.props.changeLanguage("en");
  },

  renderCampDate() {
    let monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
    ];

    if (this.props.edition.camp_start_date === undefined) {
      return null;
    }

    let startDate = new Date(this.props.edition.camp_start_date);
    let endDate = new Date(this.props.edition.camp_end_date);

    let month = monthNames[endDate.getMonth()];
    let year = 1900 + endDate.getYear();

    return `${startDate.getDate()} - ${endDate.getDate()} ${month} ${year}`;
  },


  render() {
    return <div className="home english">
        <div className="blue-section-wrapper">
            <Grid className="blue-section">
                <Header isLoggedIn={this.props.isLoggedIn}
                        current={this.props.current}
                        language={this.props.language}
                        changeLanguage={this.props.changeLanguage}
                        logout={this.props.logout} />
                <Row>
                    <Col xs={12}>
                        <h1>
                            InfoEducație
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h2>National Contest of IT&amp;C projects</h2>
                        <h5 className="tagline">
                            Edition&nbsp;
                            {this.props.current.edition.name}
                        </h5>
                    </Col>
                </Row>
                <Row className="xsmall-spacing" />
                <Row>
                    <Col xs={12}>
                        <p className="right-button">
                            <Link to="about-english" className="link link-secondary">
                                About the contest
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Grid>
        </div>

        <div className="gray-section-wrapper">
            <Grid className="gray-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={6} mdOffset={6}>
                        <h6>Alumnus</h6>
                        <Row className="small-spacing" />
                        <p className="quote">InfoEducatie is what gave me the
                        drive to learn about web technologies and develop my
                        own projects. One thing I would like to tell
                        contestants: presentation is as important as the work
                        itself! Make sure to rehearse before going in front of
                        the committee. </p>
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
                                {this.renderCampDate()}
                                <span className="pink-dash"></span>
                            </h6>
                            <h6 className="edition">
                              {countify(this.props.current.edition.count)} Edition
                            </h6>
                            <Row className="small-spacing" />
                            <p>
                                <Link to="photos-english"
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
                                <h4>EDUCATIONAL PARTNERS</h4>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <p className="logos">
                                    <a href="http://mts.ro/" target="_blank">
                                      <img src={MTS} />
                                    </a>
                                    <a href="http://upir.ro/ro/" target="_blank">
                                      <img src={Upir} />
                                    </a>
                                    <a href="http://www.edu.ro/" target="_blank">
                                      <img src={MEN} />
                                    </a>

                                </p>
                            </Col>
                        </Row>


                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h4>Gold Sponsors</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <a href="http://google.ro" target="_blank">
                              <img src={Google} />
                            </a>
                            <a href="http://intel.ro" target="_blank">
                              <img src={Intel} />
                            </a>
                            <a href="http://www.orange.ro/" target="_blank">
                              <img src={Orange} />
                            </a>
                            <a href="https://imedicare.com/" target="_blank">
                              <img src={iMedicare} />
                            </a>
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
                            <a href="http://www.cisco.com/" target="_blank">
                              <img src={Cisco} />
                            </a>
                            <a href="http://www.cloudbase.it/" target="_blank">
                              <img src={CloudBase} />
                            </a>
                            <a href="http://leonte.ro/" target="_blank">
                              <img src={leonte} />
                            </a>
                            <a href="http://www.altex.ro/" target="_blank">
                              <img src={altex} />
                            </a>
                        </p>
                    </Col>
                </Row>

                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h4>Bronze Sponsors</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <a href="http://ro.easyhost.com/incubator" target="_blank">
                              <img src={EasyHost} />
                            </a>
                            <a href="http://www.intuitext.ro/" target="_blank">
                              <img src={Intuitext} />
                            </a>
                            <a href="http://asociatiait.ro/" target="_blank">
                              <img src={Apdetic} />
                            </a>
                            <a href="http://eskills4jobs.ec.europa.eu/" target="_blank">
                              <img src={eSkills} />
                            </a>
                            <a href="https://www.facebook.com/GirlsWhoCodeRO" target="_blank">
                              <img src={gwc} />
                            </a>
                        </p>
                    </Col>
                </Row>



            </Grid>
        </div>
    </div>;
  }
});
