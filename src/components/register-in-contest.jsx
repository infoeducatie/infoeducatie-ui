"use strict";

import $ from "jquery";
import React from "react";
import { Grid, Col, Row, PanelGroup, Panel } from "react-bootstrap";

import Header from "./header";
import "./register-in-contest.less";
import RegisterContestant from "./register-in-contest/register-contestant"
import RegisterProject from "./register-in-contest/register-project"
import RegisterFinish from "./register-in-contest/register-finish"
import RegisterAdditionalWrapper from "./register-in-contest/register-additional-wrapper"

export default React.createClass({
  displayName: "RegisterInContest",

  getDefaultProps() {
    return {
      user: {
        registration_step_number: 0,
        access_token: ""
      },
      registration: {
        renderFinishForm: {
          id: 0
        },
        pending_project: {
          id: 0,
          title: ""
        },
        finished_projects: []
      }
    };
  },

  getInitialState() {
    return {
      activePanelKey: String(this.props.user.registration_step_number)
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      activePanelKey: String(nextProps.user.registration_step_number)
    });
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
                      activeKey={this.state.activePanelKey}
                      accordion>

            <Panel header="Înregistrare Participant"
                   eventKey="1"
                   bsStyle={this._getPanelStyle(1)}>
              {this.renderFormOrMessage(this.renderContestantForm, 1)}
            </Panel>
            <Panel header="Înregistrare Proiect"
                   eventKey="2"
                   bsStyle={this._getPanelStyle(2)}>
              {this.renderFormOrMessage(this.renderProjectForm, 2)}
            </Panel>

            <Panel header="Adăugare Capturi de Ecran"
                   eventKey="3"
                   bsStyle={this._getPanelStyle(3)}>
              {this.renderFormOrMessage(this.renderWIPStep, 3)}
            </Panel>

            <Panel header="Adăugare Coechipier"
                   eventKey="4"
                   bsStyle={this._getPanelStyle(4)}>
              {this.renderFormOrMessage(this.renderAdditonalForm, 4)}
            </Panel>

            <Panel header="Finalizare"
                   eventKey="5"
                   bsStyle={this._getPanelStyle(5)}>
              {this.renderFormOrMessage(this.renderFinishForm, 5)}
            </Panel>
            <Row className="small-spacing" />
            {this.renderRegisteredProjects()}
          </PanelGroup>
        </Col>
      </Grid>
    </div>;
  },

  renderFormOrMessage(renderForm, formId) {
    if (formId < this.props.user.registration_step_number) {
      return this.renderSuccess();
    } else if (formId === this.props.user.registration_step_number) {
      return renderForm();
    } else {
      return this.renderUnavailableStep();
    }
  },

  renderSuccess() {
    return <div className="success">
      Ai terminat acest pas cu succes.
    </div>;
  },

  renderUnavailableStep() {
    return <div>
      Termină ceilalți pași înainte să îl completezi pe acesta.
    </div>;
  },

  renderContestantForm() {
    return <RegisterContestant access_token={this.props.user.access_token}
                               onSubmit={this.props.refreshCurrent} />;
  },

  renderAdditonalForm() {
    return <div>
        <RegisterAdditionalWrapper access_token={this.props.user.access_token}
                                   onSubmit={this.props.refreshCurrent} />
        {this.renderSkipAdditionalContestant()}
    </div>;
  },

  renderWIPStep() {
    return <p>

      Încă nu e gata...
    </p>;
  },

  renderProjectForm() {
    return <div>
      <p>Daca nu vrei sa inscrii niciun proiect&nbsp;
        <a href="#" data-step={6} onClick={this.onUpdateRegistrationStep}>
        click aici</a>.
      </p>
      <RegisterProject access_token={this.props.user.access_token}
                       onSubmit={this.props.refreshCurrent} />
    </div>;
  },

  renderFinishForm() {
    let formEndpoint = `projects/${this.props.registration.pending_project.id}/finish`;
    return <RegisterFinish access_token={this.props.user.access_token}
                           pending_project_title={this.props.registration.pending_project.title}
                           onSubmit={this.props.refreshCurrent}
                           formEndpoint={formEndpoint} />;
  },

  renderRegisteredProjects() {
    let registerAnother = null;
    if (this.props.user.registration_step_number === 6) {
      registerAnother = <p>Pentru a înscrie un alt proiect&nbsp;
          <a href="#" data-step={2} onClick={this.onUpdateRegistrationStep}>
          click aici</a>.</p>;
    }

    if (!this.props.registration.finished_projects.length) {
      return <div>
        {registerAnother}
      </div>;
    }

    return <div>
      {registerAnother}
      <p>Proiectele inscrise de tine până acum:</p>
      <ul>
        {this.props.registration.finished_projects.map((project) => {
          return <li key={project.id}>{project.title}</li>;
        })}
      </ul>
    </div>;
  },

  renderSkipAdditionalContestant() {
    return <div>
      <p>Dacă nu dorești să mai înscrii un coechipier,&nbsp;
      <a href="#" data-step='3' onClick={this.onUpdateRegistrationStep}>click aici
      </a>.</p>
    </div>;
  },

  onHandlePanelSelect(nextActivePanelKey) {
    this.setState({
      activePanelKey: nextActivePanelKey
    });
  },

  onUpdateRegistrationStep(event) {
    event.preventDefault();
    let step_number = parseInt(event.target.attributes["data-step"].value);

    $.ajax({
      method: "POST",
      url: window.config.API_URL + "contestants/update_registration_step_number",
      headers: {
        Authorization: this.props.user.access_token
      },
      data: {step_number: step_number},
      success: this.props.refreshCurrent,
      error: this.showError
    });
  },

  showError() {
    // TODO @palcu: make this in a better way
    window.alert("Nu a mers"); // eslint-disable-line
  },

  _getPanelStyle(panelId) {
    if (panelId < this.props.user.registration_step_number) {
      return "success";
    }
    if (panelId === this.props.user.registration_step_number) {
      return "default";
    }
    return "warning";
  }
});
