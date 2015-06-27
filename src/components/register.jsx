"use strict";

import React from "react";
import $ from "jquery";
import _ from "lodash";
import { Grid, Col, Row, Input, ButtonInput } from "react-bootstrap";

import Header from "./header";
import SuccessIcon from "../../assets/img/ellipse-tick.png"
import "./register.less";


export default React.createClass({
  displayName: "Register",

  getInitialState() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      hasErrored: false,
      hasSubmited: false
    };
  },

  render() {
    return <div className="register">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row>
            <Col xs={12}>
              <h1>Înregistrare</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Trebuie să îți faci un cont nou</h2>
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
        <form onSubmit={this.onFormSubmit}>
          <Input
            type="email"
            placeholder="tuxi@pinguinescu.ro"
            label="Adresa de email"
            onChange={this.onEmailChange}
            hasFeedback
            ref="input" />
          <Input
            type="password"
            placeholder="***************"
            label="Parola"
            onChange={this.onPasswordChange}
            hasFeedback
            ref="input" />
          <Input
            type="password"
            placeholder="***************"
            label="Confirmare parolă"
            onChange={this.onPasswordConfirmationChange}
            hasFeedback
            ref="input" />
          <ButtonInput type="submit" value="Înregistrează-te" />
        </form>
        {this.renderErrors()}
      </div>;
    }
  },

  renderErrors() {
    if (this.state.hasErrored) {
      return <ul className="errors list-group">
        {this.state.errors.map((error) => {
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
        <p>Verifică căsuța ta pentru un email de confirmare.</p>
      </div>;
    }
  },

  onEmailChange(event) {
    this.setState({
      email: event.currentTarget.value
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

    let data = { };
    data["user[email]"] = this.state.email;
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
    let errors = [];
    _.forIn(data.responseJSON, (value, key) => {
      value.map((error) => {
        errors.push(key + " " + error);
      });
    });

    this.setState({
      hasErrored: true,
      errors: errors
    });
  }
});
