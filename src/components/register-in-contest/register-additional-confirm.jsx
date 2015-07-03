"use strict";

import DeepLinkedStateMixin from "react-deep-link-state";
import React from "react";
import _ from "lodash";
import { ButtonInput } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterFinish",
  mixins: [FormMixin],

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <ButtonInput type="submit"
                   value="Confirmă"
                   disabled={this.state.waitingForServerResponse} />
      {this.renderErrors()}
    </form>;
  },

  getFormData() {
    return {};
  }
});
