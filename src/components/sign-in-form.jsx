"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import PropTypes from "prop-types";

import { Button, FormControl, ControlLabel, FormGroup, ListGroup, ListGroupItem } from "@ui/bootstrap";

export default createLegacyComponent({
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
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <ControlLabel>Adresa de email</ControlLabel>
          <FormControl type="email"
                 name="email"
                 autoComplete="email"
                 required
                 onChange={this.onEmailChange} />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Parola</ControlLabel>
          <FormControl type="password"
                 name="password"
                 autoComplete="current-password"
                 required
                 onChange={this.onPasswordChange} />
               <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <Button type="submit" bsStyle="primary">Loghează-te</Button>
          <FormControl.Feedback />
        </FormGroup>
      </form>
      { this.state.hasErrored ? this.renderError() : null }
    </div>;
  },

  renderError() {
    return <ListGroup>
      <ListGroupItem bsStyle="danger">Autentificarea nu a reușit!</ListGroupItem>
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
