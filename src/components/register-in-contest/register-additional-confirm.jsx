"use strict";

import React from "react";
import _ from "lodash";
import { Button, FormGroup } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterAdditionalConfirm",
  mixins: [FormMixin],

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <FormGroup>
        <Button type="submit"
                disabled={this.state.waitingForServerResponse}>
          Confirmă
        </Button>
      </FormGroup>
      {this.renderErrors()}
    </form>;
  },

  getFormData() {
    return {
      contestant_id: this.props.contestantId
    };
  }
});
