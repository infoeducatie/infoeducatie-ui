// @flow

import React from "react";
import { Button, FormGroup } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default class RegisterFinish extends FormMixin {

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <p>Trimite proiectul tău&nbsp;
      <em>{this.props.pending_project_title}</em>.</p>
      <FormGroup>
        <Button type="submit"
                disabled={this.state.waitingForServerResponse}>
          Termină
        </Button>
      </FormGroup>
      {this.renderErrors()}
    </form>;
  }

  getFormData() {
    return {};
  }
}
