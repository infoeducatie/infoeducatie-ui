"use strict";

import request from "@lib/request";

import createLegacyComponent from "@lib/create-legacy-component";
import ctx from "classnames";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Grid, Col, Row, PanelGroup, Panel, ListGroup, ListGroupItem } from "@ui/bootstrap";

import Header from "./header";
import "../main.less";
import RegisterContestant from "./register-in-contest/register-contestant"
import RegisterProject from "./register-in-contest/register-project"
import RegisterScreenshots from "./register-in-contest/register-screenshots"
import RegisterFinish from "./register-in-contest/register-finish"
import RegisterTeacher from "./register-in-contest/register-teacher"
import RegisterAdditionalWrapper from "./register-in-contest/register-additional-wrapper"

const RegisterInContest = createLegacyComponent({
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
          {this.props.t("alreadyRegistered")}
      </p>;

    } else if (this.state.activeContestantForm &&
               this.props.current.is_registration_open) {

      let startDate = new Date(this.props.current.edition.registration_start_date).toLocaleString();
      let endDate = new Date(this.props.current.edition.registration_end_date).toLocaleString();

      contestantForm = <PanelGroup onSelect={this.onHandlePanelSelect}
                      activeKey={this.state.activePanelKey}
                      accordion>
          <p className="alert alert-warning">
            {this.props.t("period")} <br />
            {startDate} - {endDate}.
          </p>

          <Panel header={this.props.t("steps.contestant")}
                 eventKey="1"
                 bsStyle={this._getPanelStyle(1)}>
            {this.renderFormOrMessage(this.renderContestantForm, 1)}
          </Panel>
          <Panel header={this.props.t("steps.project")}
                 eventKey="2"
                 bsStyle={this._getPanelStyle(2)}>
            {this.renderError()}
            {this.renderFormOrMessage(this.renderProjectForm, 2)}
          </Panel>

          <Panel header={this.props.t("steps.screenshots")}
                 eventKey="3"
                 bsStyle={this._getPanelStyle(3)}>
            {this.renderFormOrMessage(this.renderScreenshotsForm, 3)}
            {this.renderError()}
          </Panel>

          <Panel header={this.props.t("steps.teammate")}
                 eventKey="4"
                 bsStyle={this._getPanelStyle(4)}>
            {this.renderFormOrMessage(this.renderAdditonalForm, 4)}
            {this.renderError()}
          </Panel>

          <Panel header={this.props.t("steps.finish")}
                 eventKey="5"
                 bsStyle={this._getPanelStyle(5)}>
            {this.renderFormOrMessage(this.renderFinishForm, 5)}
          </Panel>
          <Row className="small-spacing" />
          {this.renderRegisteredProjects()}
          {this.props.user.registration_step_number === 6 ? this.renderError() : null}
        </PanelGroup>;
    } else if (this.state.activeContestantForm &&
               !this.props.current.is_registration_open) {
      contestantForm = (
        <div className="registration-closed" role="status">
          <h2>{this.props.t("closedTitle")}</h2>
          <p>{this.props.t("closedDescription")}</p>
          <Link className="registration-closed-link" to="/participanti">{this.props.t("viewParticipants")}</Link>
        </div>
      );
    }
    return contestantForm;
  },

  render() {
    let contestantsClass = ctx({
      "registration-tab": true,
      active: this.state.activeContestantForm
    });
    let teachersClass = ctx({
      "registration-tab": true,
      active: this.state.activeTeacherForm
    });

    return <div className="register-in-contest">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn}
                  current={this.props.current}
                  language={this.props.language}
                  changeLanguage={this.props.changeLanguage}
                  logout={this.props.logout} />
          <Row>
            <Col xs={12}>
              <h1>{this.props.t("title")}</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>{this.props.t("subtitle")}</h2>
            </Col>
          </Row>
        </Grid>
      </div>

      <Grid className="forms-section">
        <Row>
          <Col md={6} mdOffset={3}
               sm={8} smOffset={2}
               xs={12}>
            <div className="forms-selection" role="group" aria-label={this.props.t("typeLabel")}>
              <button className={contestantsClass}
                      type="button"
                      aria-controls="registration-panel"
                      aria-pressed={this.state.activeContestantForm}
                      onClick={this.activeContestantForm}>
                {this.props.t("contestants")}
              </button>
              <button className={teachersClass}
                      type="button"
                      aria-controls="registration-panel"
                      aria-pressed={this.state.activeTeacherForm}
                      onClick={this.activeTeacherForm}>
                {this.props.t("teachers")}
              </button>
            </div>
          </Col>
        </Row>

      </Grid>

      <Grid className="registration-content">
        <Row>
          <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
            <div id="registration-panel">
              {this.renderContestant()}
              {this.renderTeacher()}
            </div>
          </Col>
        </Row>
      </Grid>
    </div>;
  },

  renderProjectPanel() {
    let projectPanel = null;

    if (this.props.current.is_registration_open) {
      projectPanel = <PanelGroup onSelect={this.onHandlePanelSelect}
                      activeKey={this.state.activePanelKey}
                      accordion>

        <Panel header={this.props.t("steps.contestant")}
               eventKey="1"
               bsStyle={this._getPanelStyle(1)}>
          {this.renderFormOrMessage(this.renderContestantForm, 1)}
        </Panel>
        <Panel header={this.props.t("steps.project")}
               eventKey="2"
               bsStyle={this._getPanelStyle(2)}>
          {this.renderError()}
          {this.renderFormOrMessage(this.renderProjectForm, 2)}
        </Panel>

        <Panel header={this.props.t("steps.screenshots")}
               eventKey="3"
               bsStyle={this._getPanelStyle(3)}>
          {this.renderFormOrMessage(this.renderScreenshotsForm, 3)}
          {this.renderError()}
        </Panel>

        <Panel header={this.props.t("steps.teammate")}
               eventKey="4"
               bsStyle={this._getPanelStyle(4)}>
          {this.renderFormOrMessage(this.renderAdditonalForm, 4)}
          {this.renderError()}
        </Panel>

        <Panel header={this.props.t("steps.finish")}
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
      {this.props.t("steps.complete")}
    </div>;
  },

  renderUnavailableStep() {
    return <div>
      {this.props.t("steps.unavailable")}
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
      <p>{this.props.t("skipProject")}&nbsp;
        <a href="#" data-step={6} onClick={this.onUpdateRegistrationStep}>
        {this.props.t("clickHere")}</a>.
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
      registerAnother = <p>{this.props.t("registerAnother")}&nbsp;
          <a href="#" data-step={2} onClick={this.onUpdateRegistrationStep}>
          {this.props.t("clickHere")}</a>.</p>;
    }

    if (!this.props.registration.finished_projects.length) {
      return <div>
        {registerAnother}
      </div>;
    }

    return <div>
      {registerAnother}
      <p>{this.props.t("registeredProjects")}</p>
      <ul>
        {this.props.registration.finished_projects.map((project) => {
          return <li key={project.id}>{project.title}</li>;
        })}
      </ul>
      <p>{this.props.t("approvalNotice")}</p>
    </div>;
  },

  renderSkipAdditionalContestant() {
    return <div>
      <p>{this.props.t("skipTeammate")}&nbsp;
      <a href="#" data-step="5" onClick={this.onUpdateRegistrationStep}>{this.props.t("clickHere")}
      </a>.</p>
    </div>;
  },

  renderError() {
    if (!this.state.hasErrored) {
      return "";
    }

    return <ListGroup>
      <ListGroupItem bsStyle="danger">
        {this.props.t("serverError")}
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

    request({
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

export default withTranslation("registration")(RegisterInContest);
