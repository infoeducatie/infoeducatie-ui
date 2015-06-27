"use strict";

import React from "react";
import $ from "jquery";
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
      hasErrored: true,
      hasSubmited: false
    }
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
      return <form onSubmit={this.onFormSubmit}>
        <Input
          type="text"
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
      </form>;
    }
  },

  renderSuccess() {
    if (this.state.hasSubmited) {
      return <div className="register-success">
        <p><img src={SuccessIcon} /></p>
        <p>Verifică căsuța ta pentru un email de confirmare.</p>
      </div>
    }
  },

  onEmailChange(event) {
    this.setState({
      hasErrored: false,
      email: event.currentTarget.value
    });
  },

  onPasswordChange(event) {
    this.setState({
      hasErrored: false,
      password: event.currentTarget.value
    });
  },

  onPasswordConfirmationChange(event) {
    this.setState({
      hasErrored: false,
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
      method: 'POST',
      url: window.config.API_URL + "users.json",
      data: data,
      success: this.onSignUpSuccess,
      error: this.onSignUpError,
    });
  },

  onSignUpSuccess(data) {
    this.setState({
      hasSubmited: true
    })
  },

  onSignUpError(data) {
    // TODO @palcu: show errors
    console.log(data);
  }
});
