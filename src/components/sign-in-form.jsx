// @flow
import React from "react"
import {Function} from "flow"

import { Button, FormControl, ControlLabel, FormGroup, ListGroup, ListGroupItem } from "reactstrap"

type Props = {
  onSignIn: Function
}

export default class SignInForm extends React.Component<Props> {

  getDefaultProps() {
    return {
      hasErrored: false
    }
  }

  steate = {
    email: "",
    password: "",
    hasErrored: this.props.hasErrored
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasErrored: nextProps.hasErrored
    });
  }

  render() {
    return <div>
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <ControlLabel>Adresa de email</ControlLabel>
          <FormControl type="email"
                 onChange={this.onEmailChange} />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Parola</ControlLabel>
          <FormControl type="password"
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
  }

  renderError() {
    return <ListGroup>
      <ListGroupItem bsStyle="danger">Autentificarea nu a reușit!</ListGroupItem>
    </ListGroup>;
  }

  onEmailChange(event) {
    this.setState({
      hasErrored: false,
      email: event.currentTarget.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      hasErrored: false,
      password: event.currentTarget.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSignIn({
      email: this.state.email,
      password: this.state.password
    });
  }
}
