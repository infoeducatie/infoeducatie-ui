"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Button, FormGroup } from "@ui/bootstrap";

import FormMixin from "../../mixins/form"


export default createLegacyComponent({
  displayName: "RegisterFinish",
  mixins: [FormMixin],

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
  },

  getFormData() {
    return {};
  }
});
