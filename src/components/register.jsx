"use strict";

import React from "react"; import $ from "jquery";
import _ from "lodash";
import { Grid, Col, Row, FormControl, FormGroup, ControlLabel, Button, Checkbox } from "react-bootstrap";

import Header from "./header";
import SuccessIcon from "../../assets/img/ellipse-tick.png"
import Spinner from "../../assets/img/spinner.gif"
import SignIn from "./sign-in"
import "../main.less";


export default React.createClass({
  displayName: "Register",

  getInitialState() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      newsletter: true,
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
              <h1>Înregistrare</h1>
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <Row className="small-spacing" />
        <Row>
          <Col md={6} mdOffset={3} sm={8} smOffset={2}>
            <p>
              Dacă ai deja un cont, te poți &nbsp;
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
      return <div>
        {this.renderErrors()}
        <form onSubmit={this.onFormSubmit}>
          <FormGroup>
            <ControlLabel>Prenume</ControlLabel>
            <FormControl
              type="text"
              placeholder="Tuxi"
              onChange={this.onFirstNameChange}
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nume</ControlLabel>
            <FormControl
              type="text"
              placeholder="Pinguinescu"
              onChange={this.onLastNameChange}
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Adresa de email</ControlLabel>
            <FormControl
              type="email"
              placeholder="tuxi@pinguinescu.ro"
              onChange={this.onEmailChange}
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Parola</ControlLabel>
            <FormControl
              type="password"
              placeholder="***************"
              onChange={this.onPasswordChange}
              pattern=".{8,}"
              title="Parola trebuie să conțină minim 8 caractere"
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Confirmare parolă</ControlLabel>
            <FormControl
              type="password"
              placeholder="***************"
              onChange={this.onPasswordConfirmationChange}
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <Checkbox
              defaultChecked
              onChange={this.onNewsletterChange}>
              Abonare newsletter (noutăți despre concurs, informații utile pentru participanți)
            </Checkbox>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <Button type="submit" disabled={this.state.waitingForServerResponse}>Înregistrează-te</Button>
            <FormControl.Feedback />
          </FormGroup>
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

  onNewsletterChange(event) {
    this.setState({
      newsletter: event.currentTarget.checked
    });
  },

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.waitingForServerResponse) {
      return false;
    }

    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({
        hasErrored: true,
        errors: ["Parola și confirmarea de parolă nu sunt identice"]
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
