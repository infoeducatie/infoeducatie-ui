"use strict";

import request from "@lib/request";

import createLegacyComponent from "@lib/create-legacy-component";
import _ from "lodash";
import { Grid, Col, Row, FormControl, FormGroup, ControlLabel, Button, Checkbox } from "@ui/bootstrap";

import Header from "./header";
import SuccessIcon from "../../assets/img/ellipse-tick.png"
import Spinner from "../../assets/img/spinner.gif"
import SignIn from "./sign-in"
import "../main.less";


export default createLegacyComponent({
  displayName: "Register",

  getInitialState() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      newsletter: false,
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
          <FormGroup controlId="register-first-name">
            <ControlLabel htmlFor="register-first-name">Prenume</ControlLabel>
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
            <ControlLabel htmlFor="register-last-name">Nume</ControlLabel>
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
            <ControlLabel htmlFor="register-email">Adresa de email</ControlLabel>
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
            <ControlLabel htmlFor="register-password">Parola</ControlLabel>
            <FormControl
              id="register-password"
              aria-describedby="register-password-help"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="***************"
              onChange={this.onPasswordChange}
              pattern=".{8,}"
              title="Parola trebuie să conțină minim 8 caractere"
              required />
            <p className="form-text" id="register-password-help">
              Folosește minimum 8 caractere.
            </p>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="register-password-confirmation">
            <ControlLabel htmlFor="register-password-confirmation">Confirmare parolă</ControlLabel>
            <FormControl
              id="register-password-confirmation"
              type="password"
              name="password-confirmation"
              autoComplete="new-password"
              placeholder="***************"
              onChange={this.onPasswordConfirmationChange}
              required />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="register-newsletter">
            <Checkbox
              id="register-newsletter"
              checked={this.state.newsletter}
              onChange={this.onNewsletterChange}>
              Abonare newsletter (noutăți despre concurs, informații utile pentru participanți)
            </Checkbox>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
              disabled={this.state.waitingForServerResponse}
            >
              {this.state.waitingForServerResponse ? "Se trimite..." : "Înregistrează-te"}
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
        errors.push("Formularul nu a putut fi trimis.");
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
