"use strict";

import React from "react";
import { Grid, Col, Row, PanelGroup, Panel } from "react-bootstrap";

import Header from "./header";
import "./register-in-contest.less";
import RegisterContestant from "./register-in-contest/register-contestant"
import RegisterProject from "./register-in-contest/register-project"
import RegisterFinish from "./register-in-contest/register-finish"

export default React.createClass({
  displayName: "RegisterInContest",

  render() {
    return <div className="register-in-contest">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn}
                  login={this.props.login}
                  logout={this.props.logout} />
          <Row>
            <Col xs={12}>
              <h1>Înregistrează-te în concurs</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Te rugăm să completezi acest formular cu grijă!</h2>
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <Col sm={6} smOffset={3}>
          <Row className="small-spacing" />
          <PanelGroup onSelect={this.onHandlePanelSelect}
                      accordion>

            <Panel header="Înregistrare Participant"
                   eventKey="1"
                   bsStyle={this.getPanelStyle(
                                this.props.current.registration.has_contestant)}>
              {this.renderContestantForm()}
            </Panel>
            <Panel header="Înregistrare Proiect"
                   eventKey="2"
                   bsStyle={this.getPanelStyle(
                                this.props.current.registration.has_pending_project ||
                                this.props.current.registration.has_projects)}
                   expanded>
              {this.renderRegisterProjectForm()}
            </Panel>

            <Panel header="Capturi de Ecran"
                   eventKey="3"
                   bsStyle="warning">
              Încă nu e gata...
            </Panel>

            <Panel header="Înregistrare Coechipier"
                   eventKey="4"
                   bsStyle="warning">
              Încă nu e gata...
            </Panel>

            <Panel header="Finalizare"
                   eventKey="5"
                   bsStyle={this.getPanelStyle(
                       !this.props.current.registration.has_pending_project &&
                       this.props.current.registration.has_projects)}>
              {this.renderFinishForm()}
            </Panel>
          </PanelGroup>
        </Col>
      </Grid>
    </div>;
  },

  renderSuccess() {
    // TODO: @palcu make this pretty
    return <div className="success">
      Ai trimis terminat acest pas cu succes.
    </div>;
  },

  renderUnavailableStep() {
    return <div className="success">
      Termină ceilalți pași înainte să îl completezi pe acesta.
    </div>;
  },

  renderContestantForm() {
    if (this.props.current.registration.has_contestant) {
      return this.renderSuccess();
    }
    else {
      return <RegisterProject current={this.props.current}
                              hasSubmited={this.submitProject} />
    }
  },

  renderRegisterProjectForm() {
    if (this.props.current.registration.has_pending_project ||
        this.props.current.registration.has_projects) {
      return this.renderSuccess();
    }
    else if (!this.props.current.registration.has_contestant) {
      return this.renderUnavailableStep();
    }
    else {
      return <RegisterProject current={this.props.current}
                              hasSubmited={this.submitProject} />
    }
  },

  renderFinishForm() {
    let formEndpoint = '';
    if (this.props.current.registration.has_contestant) {
      formEndpoint = `projects/${this.props.current.registration.pending_project.id}/finish`;
    }
    if (this.props.current.registration.has_pending_project) {
      return <RegisterFinish current={this.props.current}
                             hasSubmited={this.submitFinish}
                             formEndpoint={formEndpoint} />
    }
    if (!this.props.current.registration.has_pending_project &&
        this.props.current.registration.has_projects) {
      return this.renderSuccess();
    }
    if (!this.props.current.registration.has_pending_project &&
        !this.props.current.registration.has_projects) {
      return this.renderUnavailableStep();
    }
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
    this.props.refreshCurrent();
  },

  submitProject() {
    this.props.refreshCurrent();
  },

  submitFinish() {
    this.props.refreshCurrent();
  },
});
