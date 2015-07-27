"use strict";

import $ from "jquery";
import React from "react";
import ctx from "classnames";
import { Grid, Col, Row, PanelGroup, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

import Header from "./header";
import "../main.less";
import RegisterContestant from "./register-in-contest/register-contestant"
import RegisterProject from "./register-in-contest/register-project"
import RegisterScreenshots from "./register-in-contest/register-screenshots"
import RegisterFinish from "./register-in-contest/register-finish"
import RegisterTeacher from "./register-in-contest/register-teacher"
import RegisterAdditionalWrapper from "./register-in-contest/register-additional-wrapper"

export default React.createClass({
  displayName: "RegisterInContest",

  getDefaultProps() {
    return {
      current: {
        is_teacher: false,
        is_contestant: false
      },
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
      activeContestantForm: true,
      activeTeacherForm: false,
      activePanelKey: String(this.props.user.registration_step_number),
      hasErrored: false
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      activePanelKey: String(nextProps.user.registration_step_number)
    });
  },

  activeTeacherForm() {
    this.setState({
      activeTeacherForm: true,
      activeContestantForm: false
    });
  },

  activeContestantForm() {
    this.setState({
      activeTeacherForm: false,
      activeContestantForm: true
    });
  },

  renderTeacher() {
    let teacherForm = null;

    if (this.state.activeTeacherForm) {
      teacherForm = <div>
        <RegisterTeacher access_token={this.props.user.access_token}
                         onSubmit={this.props.refreshCurrent}
                         is_teacher={this.props.current.is_teacher}
                         is_contestant={this.props.current.is_contestant} />
      </div>;
    }

    return teacherForm;
  },

  renderContestant() {
    let contestantForm = null;

    if (this.props.current.is_teacher) {
      contestantForm = <p className="alert alert-warning">
          Sunteți deja înregistrat.
      </p>;

    } else if (this.state.activeContestantForm &&
               this.props.current.is_registration_open) {

      let startDate = new Date(this.props.current.edition.registration_start_date).toLocaleString();
      let endDate = new Date(this.props.current.edition.registration_end_date).toLocaleString();

      contestantForm = <PanelGroup onSelect={this.onHandlePanelSelect}
                      activeKey={this.state.activePanelKey}
                      accordion>
          <p className="alert alert-warning">
            Înscrieriile se desfășoară în perioada <br />
            {startDate} - {endDate}.
          </p>

          <Panel header="Înregistrare Concurent"
                 eventKey="1"
                 bsStyle={this._getPanelStyle(1)}>
            {this.renderFormOrMessage(this.renderContestantForm, 1)}
          </Panel>
          <Panel header="Înregistrare Proiect"
                 eventKey="2"
                 bsStyle={this._getPanelStyle(2)}>
            {this.renderError()}
            {this.renderFormOrMessage(this.renderProjectForm, 2)}
          </Panel>

          <Panel header="Adăugare Capturi Ecran"
                 eventKey="3"
                 bsStyle={this._getPanelStyle(3)}>
            {this.renderFormOrMessage(this.renderScreenshotsForm, 3)}
            {this.renderError()}
          </Panel>

          <Panel header="Adăugare Coechipier"
                 eventKey="4"
                 bsStyle={this._getPanelStyle(4)}>
            {this.renderFormOrMessage(this.renderAdditonalForm, 4)}
            {this.renderError()}
          </Panel>

          <Panel header="Finalizare"
                 eventKey="5"
                 bsStyle={this._getPanelStyle(5)}>
            {this.renderFormOrMessage(this.renderFinishForm, 5)}
          </Panel>
          <Row className="small-spacing" />
          {this.renderRegisteredProjects()}
          {this.props.user.registration_step_number === 6 ? this.renderError() : null}
        </PanelGroup>;
    }
    return contestantForm;
  },

  render() {
    let contestantsClass = ctx({
      description: true,
      active: this.state.activeContestantForm
    });
    let teachersClass = ctx({
      description: true,
      active: this.state.activeTeacherForm
    });

    return <div className="register-in-contest">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn}
                  language={this.props.language}
                  changeLanguage={this.props.changeLanguage}
                  login={this.props.login}
                  logout={this.props.logout} />
          <Row>
            <Col xs={12}>
              <h1>Participă la InfoEducație</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Te rugăm să completezi aceste formulare cu grijă!</h2>
            </Col>
          </Row>
        </Grid>
      </div>

      <Grid className="forms-section">
        <Row>
          <Col md={6} mdOffset={3}
               sm={8} smOffset={2}
               xs={12}>
            <Row className="forms-selection">
              <Col xs={6}>
                  <p className={contestantsClass}
                     onClick={this.activeContestantForm}>
                     Concurenți
                  </p>
              </Col>
              <Col xs={6} className="border-left">
                  <p className={teachersClass}
                     onClick={this.activeTeacherForm}>
                     Profesori
                  </p>
              </Col>
            </Row>
          </Col>
        </Row>

      </Grid>

      <Grid>
        <Col sm={6} smOffset={3}>
          <Row className="small-spacing" />
          {this.renderContestant()}
          {this.renderTeacher()}
        </Col>
      </Grid>
    </div>;
  },

  renderProjectPanel() {
    let projectPanel = null;

    if (this.props.current.is_registration_open) {
      projectPanel = <PanelGroup onSelect={this.onHandlePanelSelect}
                      activeKey={this.state.activePanelKey}
                      accordion>

        <Panel header="Înregistrare Concurent"
               eventKey="1"
               bsStyle={this._getPanelStyle(1)}>
          {this.renderFormOrMessage(this.renderContestantForm, 1)}
        </Panel>
        <Panel header="Înregistrare Proiect"
               eventKey="2"
               bsStyle={this._getPanelStyle(2)}>
          {this.renderError()}
          {this.renderFormOrMessage(this.renderProjectForm, 2)}
        </Panel>

        <Panel header="Adăugare Capturi Ecran"
               eventKey="3"
               bsStyle={this._getPanelStyle(3)}>
          {this.renderFormOrMessage(this.renderScreenshotsForm, 3)}
          {this.renderError()}
        </Panel>

        <Panel header="Adăugare Coechipier"
               eventKey="4"
               bsStyle={this._getPanelStyle(4)}>
          {this.renderFormOrMessage(this.renderAdditonalForm, 4)}
          {this.renderError()}
        </Panel>

        <Panel header="Finalizare"
               eventKey="5"
               bsStyle={this._getPanelStyle(5)}>
          {this.renderFormOrMessage(this.renderFinishForm, 5)}
        </Panel>
        <Row className="small-spacing" />
        {this.renderRegisteredProjects()}
        {this.props.user.registration_step_number === 6 ? this.renderError() : null}
      </PanelGroup>;
    }

    return projectPanel;
  },

  renderFormOrMessage(renderForm, formId) {
    if (formId < this.props.user.registration_step_number) {
      return this.renderSuccessStep();
    }
    if (formId === this.props.user.registration_step_number) {
      return renderForm();
    }
    return this.renderUnavailableStep();
  },

  renderSuccessStep() {
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
                                   onSubmit={this.props.refreshCurrent}
                                   pendingProject={this.props.registration.pending_project} />
        {this.renderSkipAdditionalContestant()}
    </div>;
  },

  renderScreenshotsForm() {
    let formEndpoint = `projects/${this.props.registration.pending_project.id}/screenshots`;
    return <RegisterScreenshots access_token={this.props.user.access_token}
                                onSubmit={this.props.refreshCurrent}
                                formEndpoint={formEndpoint}
                                screenshotsCount={this.props.registration.pending_project.screenshots_count}
                                onSkipStep={this.onUpdateRegistrationStep} />;
  },

  renderProjectForm() {
    return <div>
      <p>Dacă nu vrei sa inscrii niciun proiect&nbsp;
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
      <p>Proiectele vor trebui să fie aprobate ca să apară în secțiunea de
      participanți</p>
    </div>;
  },

  renderSkipAdditionalContestant() {
    return <div>
      <p>Dacă nu dorești să mai înscrii un coechipier,&nbsp;
      <a href="#" data-step='5' onClick={this.onUpdateRegistrationStep}>click aici
      </a>.</p>
    </div>;
  },

  renderError() {
    if (!this.state.hasErrored) {
      return "";
    }

    return <ListGroup>
      <ListGroupItem bsStyle="danger">
        A apărut o eroare la comunicarea cu serverul. Mai incercă o dată.
      </ListGroupItem>
    </ListGroup>;
  },

  onHandlePanelSelect(nextActivePanelKey) {
    this.setState({
      activePanelKey: nextActivePanelKey
    });
  },

  onUpdateRegistrationStep(event) {
    event.preventDefault();
    let step_number = parseInt(event.target.attributes["data-step"].value);

    this.setState({
      hasErrored: false
    });

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
    this.setState({
      hasErrored: true
    });
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
