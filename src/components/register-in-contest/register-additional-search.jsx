"use strict";

import React from "react";
import _ from "lodash";
import { Input, ButtonInput } from "react-bootstrap";

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
      <Input type="email"
             placeholder="coleg@infoeducatie.ro"
             label="Adresa de email a coechipierului"
             value={this.additionalEmail}
             onChange={this.onInputEmailChange}
             required />
      <ButtonInput type="submit"
                   value="Caută"
                   disabled={this.state.waitingForServerResponse} />
    </form>
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
