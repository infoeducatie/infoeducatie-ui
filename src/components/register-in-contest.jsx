"use strict";

import React from "react";
import { Grid, Col, Row, PanelGroup, Panel } from "react-bootstrap";

import Header from "./header";
import "./register-in-contest.less";
import RegisterContestant from "./register-in-contest/register-contestant"
import RegisterProject from "./register-in-contest/register-project"

export default React.createClass({
  displayName: "RegisterInContest",

  getInitialState() {
    // TODO @palcu: add logic for the other forms
    let activePanelKey = 1;
    if (this.props.current.registration.has_contestant) {
      activePanelKey++;
    }

    return {
      hasSubmitedParticipantForm:
          this.props.current.registration.has_contestant,
      hasSubmitedProjectForm: false,
      activePanelKey: String(activePanelKey)
    };
  },

  render() {
    return <div className="register-in-contest">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn}
                  login={this.props.login}
                  logout={this.props.logout} />
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
          <PanelGroup onSelect={this.onHandlePanelSelect}
                      activeKey={this.state.activePanelKey}
                      accordion>
            <Panel header="Înregistrare Participant"
                   eventKey="1"
                   bsStyle={this.getPanelStyle(
                                this.state.hasSubmitedParticipantForm)}>
              {this.state.hasSubmitedParticipantForm ? this.renderSuccess() :
                  <RegisterContestant current={this.props.current}
                                      hasSubmited={this.submitParticipant} />}
            </Panel>
            <Panel header="Înregistrare Proiect"
                   eventKey="2"
                   expanded>
              {this.state.hasSubmitedProjectForm ? this.renderSuccess() :
                  <RegisterProject current={this.props.current}
                                   hasSubmited={this.submitProject} />}
            </Panel>
            <Panel header="Înregistrare Coechipier"
                   eventKey="3">
              Formular de înregistrare coechipier
            </Panel>
            <Panel header="Finalizare"
                   eventKey="4">
              Aici confirmă...
            </Panel>
          </PanelGroup>
        </Col>
      </Grid>
    </div>;
  },

  renderSuccess() {
    // TODO: @palcu make this pretty
    return <div className="success">
      Ai trimis formularul cu succes.
    </div>;
  },

  getPanelStyle(status) {
    return status ? "success" : "default";
  },

  onHandlePanelSelect(nextActivePanelKey) {
    this.setState({
      activePanelKey: nextActivePanelKey
    });
  },

  submitParticipant() {
    this.setState({
      hasSubmitedParticipantForm: true
    });
  },

  submitProject() {
    this.setState({
      hasSubmitedProjectForm: true
    });
  }
});
