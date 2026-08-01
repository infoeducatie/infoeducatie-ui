"use strict";

import request from "@lib/request";

import createLegacyComponent from "@lib/create-legacy-component";
import _ from "lodash";
import { Eye, EyeOff } from "lucide-react";
import { withTranslation } from "react-i18next";
import { Grid, Col, Row, FormControl, FormGroup, ControlLabel, Button, Checkbox } from "@ui/bootstrap";

import Header from "./header";
import SuccessIcon from "../../assets/img/ellipse-tick.png"
import Spinner from "../../assets/img/spinner.gif"
import SignIn from "./sign-in"
import "../main.less";


const Register = createLegacyComponent({
  displayName: "Register",

  getInitialState() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      newsletter: false,
      showPasswords: false,
      errors: [],
      hasErrored: false,
      hasSubmited: false,
      waitingForServerResponse: false
    };
  },

  render() {
    return <div className="register">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn}
                  current={this.props.current}
                  language={this.props.language}
                  changeLanguage={this.props.changeLanguage}
                  logout={this.props.logout} />
          <Row className="small-spacing" />
          <Row>
            <Col xs={12}>
              <h1>{this.props.t("register.title")}</h1>
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid className="registration-form-section">
        <Row>
          <Col md={6} mdOffset={3} sm={8} smOffset={2}>
            <p className="register-sign-in">
              {this.props.t("register.existingAccount")}&nbsp;
              <SignIn />.
            </p>
            {this.renderForm()}
            {this.renderSuccess()}
          </Col>
        </Row>
      </Grid>
    </div>;
  },

  renderForm() {
    if (!this.state.hasSubmited) {
      const PasswordIcon = this.state.showPasswords ? EyeOff : Eye;
      const passwordType = this.state.showPasswords ? "text" : "password";
      const toggleLabel = this.state.showPasswords
        ? this.props.t("register.hidePasswords")
        : this.props.t("register.showPasswords");

      return <div>
        {this.renderErrors()}
        <form onSubmit={this.onFormSubmit}>
          <FormGroup controlId="register-first-name">
            <ControlLabel htmlFor="register-first-name">{this.props.t("fields.firstName")}</ControlLabel>
            <FormControl
              id="register-first-name"
              type="text"
              name="given-name"
              autoComplete="given-name"
              placeholder="Tuxi"
              onChange={this.onFirstNameChange}
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="register-last-name">
            <ControlLabel htmlFor="register-last-name">{this.props.t("fields.lastName")}</ControlLabel>
            <FormControl
              id="register-last-name"
              type="text"
              name="family-name"
              autoComplete="family-name"
              placeholder="Pinguinescu"
              onChange={this.onLastNameChange}
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="register-email">
            <ControlLabel htmlFor="register-email">{this.props.t("fields.email")}</ControlLabel>
            <FormControl
              id="register-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="tuxi@pinguinescu.ro"
              onChange={this.onEmailChange}
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="register-password">
            <ControlLabel htmlFor="register-password">{this.props.t("fields.password")}</ControlLabel>
            <div className="password-field">
              <FormControl
                id="register-password"
                aria-describedby="register-password-help"
                type={passwordType}
                name="password"
                autoComplete="new-password"
                placeholder={this.props.t("register.passwordPlaceholder")}
                onChange={this.onPasswordChange}
                pattern=".{8,}"
                title={this.props.t("register.passwordRule")}
                required />
              <button className="password-toggle" type="button"
                      aria-label={toggleLabel} aria-pressed={this.state.showPasswords}
                      title={toggleLabel} onClick={this.onTogglePasswordVisibility}>
                <PasswordIcon aria-hidden="true" size={20} />
              </button>
            </div>
            <p className="form-text" id="register-password-help">
              {this.props.t("register.passwordHelp")}
            </p>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="register-password-confirmation">
            <ControlLabel htmlFor="register-password-confirmation">{this.props.t("register.passwordConfirmation")}</ControlLabel>
            <div className="password-field">
              <FormControl
                id="register-password-confirmation"
                type={passwordType}
                name="password-confirmation"
                autoComplete="new-password"
                placeholder={this.props.t("register.passwordConfirmationPlaceholder")}
                onChange={this.onPasswordConfirmationChange}
                required />
              <button className="password-toggle" type="button"
                      aria-label={toggleLabel} aria-pressed={this.state.showPasswords}
                      title={toggleLabel} onClick={this.onTogglePasswordVisibility}>
                <PasswordIcon aria-hidden="true" size={20} />
              </button>
            </div>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="register-newsletter">
            <Checkbox
              id="register-newsletter"
              checked={this.state.newsletter}
              onChange={this.onNewsletterChange}>
              {this.props.t("register.newsletter")}
            </Checkbox>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
              disabled={this.state.waitingForServerResponse}
            >
              {this.state.waitingForServerResponse
                ? this.props.t("register.submitting")
                : this.props.t("register.submit")}
            </Button>
            <FormControl.Feedback />
          </FormGroup>
          {this.state.waitingForServerResponse ? (
            <img alt="" aria-hidden="true" src={Spinner} />
          ) : null}
        </form>
      </div>;
    }
  },

  renderErrors() {
    if (this.state.hasErrored) {
      let errors = _.clone(this.state.errors);

      if (!errors.length) {
        errors.push(this.props.t("register.genericError"));
      }

      return <ul className="errors list-group" role="alert">
        {errors.map((error) => {
          return <li className="list-group-item list-group-item-danger"
                     key={error}>
            {error}
          </li>;
        })}
      </ul>;
    }
  },

  renderSuccess() {
    if (this.state.hasSubmited) {
      return <div className="register-success" role="status">
        <p><img alt="" aria-hidden="true" src={SuccessIcon} /></p>
        <p>{this.props.t("register.success")}</p>
      </div>;
    }
  },

  onEmailChange(event) {
    this.setState({
      email: event.currentTarget.value
    });
  },

  onFirstNameChange(event) {
    this.setState({
      firstName: event.currentTarget.value
    });
  },

  onLastNameChange(event) {
    this.setState({
      lastName: event.currentTarget.value
    });
  },

  onPasswordChange(event) {
    this.setState({
      password: event.currentTarget.value
    });
  },

  onPasswordConfirmationChange(event) {
    this.setState({
      passwordConfirmation: event.currentTarget.value
    });
  },

  onNewsletterChange(event) {
    this.setState({
      newsletter: event.currentTarget.checked
    });
  },

  onTogglePasswordVisibility() {
    this.setState({ showPasswords: !this.state.showPasswords });
  },

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.waitingForServerResponse) {
      return false;
    }

    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({
        hasErrored: true,
        errors: [this.props.t("register.passwordMismatch")]
      });

      return false;
    }

    this.setState({
      waitingForServerResponse: true
    });

    let data = { };
    data["user[email]"] = this.state.email;
    data["user[first_name]"] = this.state.firstName;
    data["user[last_name]"] = this.state.lastName;
    data["user[password]"] = this.state.password;
    data["user[password_confirmation]"] = this.state.passwordConfirmation;
    data["user[newsletter]"] = this.state.newsletter;

    request({
      method: "POST",
      url: window.config.API_URL + "users.json",
      data: data,
      success: this.onSignUpSuccess,
      error: this.onSignUpError
    });
  },

  onSignUpSuccess() {
    this.setState({
      hasSubmited: true
    });
  },

  onSignUpError(data) {
    this.setState({
      hasErrored: true,
      waitingForServerResponse: false
    });

    let errors = [];

    if (("responseJSON" in data) && _.isArray(data.responseJSON)) {
      _.forIn(data.responseJSON, (value, key) => {
        value.map((error) => {
          errors.push(key + " " + error);
        });
      });

      this.setState({
        errors: errors
      });
    }
  }
});

export default withTranslation("forms")(Register);
