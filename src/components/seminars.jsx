"use strict";

import React from "react";

import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./seminars.less";
import CristiAvatar from "../../assets/img/alumni/cristi.png";


export default React.createClass({
  displayName: "Seminars",

  getInitialState() {
    return {
      seminars: [
        {
          "description": `O introducere in conceptele necesare dezvoltarii aplicatilor bazate pe paradigma pe care cloud computing o introduce. Putem la discutie functionalitatile, sabloanele de dezvoltare si constrangerile pe care o platforma de tip cloud le ofera. Discutia va fi in jurul servicilor puse la dispozitie de Amazon Web Services. `,
          "lector": {
            "avatar": CristiAvatar,
            "name": "Bogdan Gaza",
            "position": "software engineer @ twitter"
          },
          "title": "Architecting for the cloud",
          "color": "green"
        },
      ]
    };
  },

  renderSeminar(seminar) {
    let className = ctx("seminar-container", seminar.color);

    return <Row key={seminar.id}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10}>
        <Row className="small-spacing" />
        <Row>
          <Col className={className} xs={12}>
            <Row className="small-spacing" />
            <Row>
              <Col xs={3} xsOffset={1}>
                <Row className="xsmall-spacing" />
                <div className="seminar-image">
                  <img src={seminar.lector.avatar} />
                </div>
              </Col>
              <Col xs={7} xsOffset={1}>
                <p>{seminar.description}</p>
                <Row className="small-spacing" />
                <h5 className="seminar-name">{seminar.lector.name}</h5>
                <p className="seminar-position">{seminar.lector.position}</p>
              </Col>
            </Row>
            <Row className="small-spacing" />
          </Col>
        </Row>
      </Col>
    </Row>;
  },

  render() {
    return <div className="seminars">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h1>Seminarii InfoEducație</h1>
              <h2>Ediția 2015</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        {this.state.seminars.map(this.renderSeminar)}
      </Grid>
   </div>;
  }
});
