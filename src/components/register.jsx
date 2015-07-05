"use strict";

import React from "react";
import $ from "jquery";
import _ from "lodash";
import { Grid, Col, Row, Input, ButtonInput } from "react-bootstrap";

import Header from "./header";
import SuccessIcon from "../../assets/img/ellipse-tick.png"
import Spinner from "../../assets/img/spinner.gif"
import "./register.less";


export default React.createClass({
  displayName: "Register",

  getInitialState() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
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
                  language={this.props.language}
                  changeLanguage={this.props.changeLanguage}
                  login={this.props.login}
                  logout={this.props.logout} />
          <Row className="small-spacing" />
          <Row>
            <Col xs={12}>
              <h1>Înregistrare</h1>
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <Row className="small-spacing" />
        <Row>
          <Col md={6} mdOffset={3} sm={8} smOffset={2}>
            {this.renderForm()}
            {this.renderSuccess()}
          </Col>
        </Row>
      </Grid>
    </div>;
  },

  renderForm() {
    if (!this.state.hasSubmited) {
      return <div>
        {this.renderErrors()}
        <form onSubmit={this.onFormSubmit}>
          <Input
            type="text"
            placeholder="Tuxi"
            label="Prenume"
            onChange={this.onFirstNameChange}
            required />
          <Input
            type="text"
            placeholder="Pinguinescu"
            label="Nume"
            onChange={this.onLastNameChange}
            required />
          <Input
            type="email"
            placeholder="tuxi@pinguinescu.ro"
            label="Adresa de email"
            onChange={this.onEmailChange}
            required />
          <Input
            type="password"
            placeholder="***************"
            label="Parola"
            onChange={this.onPasswordChange}
            required />
          <Input
            type="password"
            placeholder="***************"
            label="Confirmare parolă"
            onChange={this.onPasswordConfirmationChange}
            required />
          <ButtonInput type="submit"
                       value="Înregistrează-te"
                       disabled={this.state.waitingForServerResponse} />
          {this.state.waitingForServerResponse ? <img src={Spinner} /> : null}
        </form>
      </div>;
    }
  },

  renderErrors() {
    if (this.state.hasErrored) {
      let errors = _.clone(this.state.errors);

      if (!errors.length) {
        errors.push("Formularul nu a putut fi trimis.");
      }

      return <ul className="errors list-group">
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
      return <div className="register-success">
        <p><img src={SuccessIcon} /></p>
        <p>Verifică căsuța ta de poștă electronică pentru un mesaj de
        confirmare.</p>
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

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.waitingForServerResponse) {
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

    $.ajax({
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
