"use strict";

import React from "react";

import { Row, Col, Grid } from "react-bootstrap";
import Header from "../header";

import "../about.less"
import DefaultDocument from "../../../assets/img/icons/doc.png";


export default React.createClass({
  displayName: "GalaciucPage",

  render() {
    return <div className="galaciuc">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      changeLanguage={this.props.changeLanguage}
                      language={this.props.language}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row className="small-spacing" />
          <Row>
            <Col xs={12}>
              <h1>About InfoEducație</h1>
            </Col>
          </Row>
          <Row className="small-spacing" />
        </Grid>
      </div>
      <Grid className="white-section">
        <Row>
          <Col mdOffset={1} md={10}>
            <Row className="small-spacing" />
            <p>
            Since 1993, InfoEducatie has been focused on students with the
            skills and interest to develop their own applications, whether
            their schoolwork specialized in Computer Science or not. The
            competition is conducted in four stages: school, town, county and
            national. The national level takes place at the Gălăciuc camp, in
            the Vrancea county.
            </p>
            <Row className="small-spacing" />
            <Row>
              <Col xs={12}>
                <div className="category yellow">
                  <div className="round-icon">
                    <span className="section-icon web" />
                  </div>
                  <div className="description">web</div>
                </div>

                <div className="category blue">
                  <div className="round-icon">
                    <span className="section-icon roboti" />
                  </div>
                  <div className="description">robots</div>
                </div>

                <div className="category green">
                  <div className="round-icon">
                    <span className="section-icon multimedia" />
                  </div>
                  <div className="description">media</div>
                </div>

                <div className="category pink">
                  <div className="round-icon">
                    <span className="section-icon educational" />
                  </div>
                  <div className="description">educational</div>
                </div>

                <div className="category black">
                  <div className="round-icon">
                    <span className="section-icon utilitar" />
                  </div>
                  <div className="description">utility</div>
                </div>
              </Col>
            </Row>
            <Row className="small-spacing" />
            <Row>
              <Col xs={12}>
                <h4>How can I participate?</h4>
                <p>
                  Every level of the competition involves the contestant
                  presenting different projects that they have made themselves,
                  regardless of their year of study (classes IX through XII).
                  Depending of the ranking their project obtained, the student
                  may move on to the next stage of the competition.
                </p>
                <p>
                In the final stage, we organize an open contest, which will be
                undertaken by teams of students and will take place over a
                period of 24 hours. Each team must develop an application
                which will be specific to the branch of the contest that they
                entered. The work will combine elements both of design and of
                programming.
                </p>
                <p>
                While at the camp, we will be setting up a number of workshops
                and talks of various themes related to software engineering.
                </p>
                <p>
                All IT resources will be provided by the Unirea Ntional
                College, the Tulnici community and the Vidra high school.
                <Row className="small-spacing" />
                <h4>Terms of participation</h4>
                <p>
                    Each county can participate with maximum of
                    <em>5 students</em> and one <em>assistant teacher</em>
                    who will abide by the following rules:
                </p>
                <ul>
                  <li>
                    Minimum 3 projects
                  </li>
                  <li>
                    Reasonable hardware and software requirements
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>;
  }
});
