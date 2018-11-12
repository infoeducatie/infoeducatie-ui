// @flow

import React from "react";
import { Button, FormGroup } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default class RegisterAdditionalConfirm extends FormMixin {
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
  }

  getFormData() {
    return {
      contestant_id: this.props.contestantId
    };
  }
}
