"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Button, FormGroup } from "@ui/bootstrap";

import FormMixin from "../../mixins/form"


export default createLegacyComponent({
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
