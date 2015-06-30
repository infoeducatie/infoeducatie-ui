"use strict";

import React from "react";
import { Grid, Col, Row, PanelGroup, Panel } from "react-bootstrap";

import Header from "./header";
import "./register-in-contest.less";
import RegisterContestant from "./register-in-contest/register-contestant"

export default React.createClass({
  displayName: "RegisterInContest",

  render() {
    return <div className="register-in-contest">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row>
            <Col xs={12}>
              <h1>Înregistrează un proiect</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Te rugăm să completezi acest formular cu grijă</h2>
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <Col sm={6} smOffset={3}>
          <Row className="small-spacing" />
          <PanelGroup onSelect={this.handleSelect}
                      defaultActiveKey='1'
                      accordion>
            <Panel header='Înregistrare Participant'
                   eventKey='1'>
              <RegisterContestant currentUser={this.props.currentUser} />
            </Panel>
            <Panel header='Înregistrare Proiect'
                   eventKey='2'>
              Formular de înregistrare proiect
            </Panel>
            <Panel header='Înregistrare Coechipier'
                   eventKey='3'>
              Formular de înregistrare coechipier
            </Panel>
            <Panel header='Finalizare'
                   eventKey='4'>
              Aici confirmă...
            </Panel>
          </PanelGroup>
        </Col>
      </Grid>
    </div>;
  }
});
