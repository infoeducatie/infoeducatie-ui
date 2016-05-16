"use strict";

import React from "react";
import _ from "lodash";
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterAdditional",
  mixins: [FormMixin],

  getInitialState() {
    return {
      additionalEmail: ""
    };
  },

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <FormGroup>
        <ControlLabel>Adresa de email a coechipierului *</ControlLabel>
        <FormControl type="email"
               placeholder="coleg@infoeducatie.ro"
               value={this.additionalEmail}
               onChange={this.onInputEmailChange}
               required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <Button type="submit"
                disabled={this.state.waitingForServerResponse}>
          Caută
        </Button>
      </FormGroup>
    </form>;
  },

  onInputEmailChange(event) {
    let email = event.target.value;
    this.setState({
      additionalEmail: email
    });
  },

  getFormData() {
    return {
      email: this.state.additionalEmail
    };
  }
});
