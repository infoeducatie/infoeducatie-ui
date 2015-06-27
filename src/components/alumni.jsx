"use strict";

import React from "react";

import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./alumni.less";
import CristiAvatar from "../../assets/img/cristi.png";


export default React.createClass({
  displayName: "Alumni",

  getInitialState() {
    return {
      alumni: [
        {
          "description": `La momentul respectiv, era o joacă, acum infoarena
                         este o organizație cu activitate solidă și cu un
                         impact mare în randul tinerilor pasionați de
                         informatică.`,
          "avatar": CristiAvatar,
          "name": "Cristian Strat",
          "position": "growth @ twitter",
          "color": "green"
        },
        {
          "description": `InfoEducație a fost probabil principalul motiv
                         pentru care mi-a plăcut să fac web în anii de
                         liceu. InfoEducație mi-a oferit ocazia de a vedea
                         cât de bun sunt, să explorez, să nu mă mulțumesc cu
                         puțin.`,
          "avatar": CristiAvatar,
          "name": "Octavian Costache",
          "position": "software developer @ google",
          "color": "orange"
        },
        {
          "description": `Un eveniment excelent pentru oamenii cu idei,
                         pentru elevii care pun efort și pasiune într-un
                         proiect în afara școlii. Munca depusă contează
                         acum, în concurs, dar va conta și în 2, 3, 5,
                         10 ani.`,
          "avatar": CristiAvatar,
          "name": "Tudor Leu",
          "position": "software engineer @ google checkout",
          "color": "black"
        }
      ]
    };
  },

  renderAlumnus(alumnus) {
    let className = ctx("alumnus-container", alumnus.color);

    return <Row>
      <Col mdOffset={3} md={6}>
        <Row className="small-spacing" />
        <Row>
          <Col className={className}>
            <Row className="small-spacing" />
            <Row>
              <Col mdOffset={1} md={1}>
                <Row className="xsmall-spacing" />
                <div className="alumnus-image"><img src={alumnus.avatar} /></div>
              </Col>
              <Col mdOffset={1} md={8}>
                <p>{alumnus.description}</p>
                <p className="alumnus-name">{alumnus.name}</p>
                <p className="alumnus-position">{alumnus.position}</p>
              </Col>
            </Row>
            <Row className="small-spacing" />
          </Col>
        </Row>
      </Col>
    </Row>;
  },

  render() {
    return <div className="alumni">
      <div className="gray-section-wrapper">
        <Grid className="gray-section">
          <Row>
            <Col>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>Alumni InfoEducație</h1>
              <h2>Generația IT din România</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        {this.state.alumni.map(this.renderAlumnus)}
      </Grid>
   </div>;
  }
});
