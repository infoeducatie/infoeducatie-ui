"use strict";

import React from "react";

import { Row, Col, Grid } from "react-bootstrap";
import Header from "./header";

import "./about.less"
import DefaultDocument from "../../assets/img/icons/doc.png";


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
              Organized since 1993 , it is aimed at students with skills and
              interests to create applications, such as computer profile and
              other profiles . The competition is conducted in four stages: on
              your school, local, county and national level. National stage
              takes place in the camp Gălăciuc, Vrancea county.
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
                  Each stage will be presented works made by students
                  regardless of their year of study (classes IX - XII).
                  Participation in the later stages is determined by
                  rankings previous stages.
                </p>
                <p>
                  In the final stage there is an open competition , the teams
                  over 24 hours. The contest consists of a construction
                  project on a specific subject . The work will combine
                  elements of design, programming and design.
                </p>
                <p>
                  Throughout the camp will be organized
                  workshops on topics of software engineering .
                </p>
                <p>
                  All IT resources are provided by the National College
                  Unirea, local Tulnici community and Vidra Highschool.
                </p>
                <Row className="small-spacing" />
                <h4>Terms of participation</h4>
                <p>
                    Each county can participate with maximum of
                    <em>5 students</em> and one <em>assistant teacher</em>
                    with respect of following rules:
                </p>
                <ul>
                  <li>
                    minimum three projects
                  </li>
                  <li>
                    reasonable hardware and software requirements
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
