"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import { Button, FormControl, ControlLabel, FormGroup, ListGroup, ListGroupItem } from "@ui/bootstrap";

const SignInForm = createLegacyComponent({
  displayName: "SignInForm",

  propTypes: {
    onSignIn: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      hasErrored: false
    };
  },

  getInitialState() {
    return {
      email: "",
      password: "",
      hasErrored: this.props.hasErrored
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasErrored: nextProps.hasErrored
    });
  },

  render() {
    return <div>
      <form className="sign-in-form" onSubmit={this.onSubmit}>
        <FormGroup controlId="sign-in-email">
          <ControlLabel htmlFor="sign-in-email">{this.props.t("fields.email")}</ControlLabel>
          <FormControl type="email"
                 id="sign-in-email"
                 name="email"
                 autoComplete="email"
                 required
                 onChange={this.onEmailChange} />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="sign-in-password">
          <ControlLabel htmlFor="sign-in-password">{this.props.t("fields.password")}</ControlLabel>
          <FormControl type="password"
                 id="sign-in-password"
                 name="password"
                 autoComplete="current-password"
                 required
                 onChange={this.onPasswordChange} />
               <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <Button className="sign-in-submit" type="submit" bsStyle="primary">
            {this.props.t("signIn.submit")}
          </Button>
          <FormControl.Feedback />
        </FormGroup>
      </form>
      { this.state.hasErrored ? this.renderError() : null }
    </div>;
  },

  renderError() {
    return <ListGroup className="sign-in-error">
      <ListGroupItem bsStyle="danger">{this.props.t("signIn.error")}</ListGroupItem>
    </ListGroup>;
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

  onSubmit(event) {
    event.preventDefault();
    this.props.onSignIn({
      email: this.state.email,
      password: this.state.password
    });
  }
});

export default withTranslation("forms")(SignInForm);
