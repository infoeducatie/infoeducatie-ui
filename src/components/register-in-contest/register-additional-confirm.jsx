"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Button, FormGroup } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import FormMixin from "../../mixins/form"


const RegisterAdditionalConfirm = createLegacyComponent({
  displayName: "RegisterAdditionalConfirm",
  mixins: [FormMixin],

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <FormGroup>
        <Button type="submit"
                disabled={this.state.waitingForServerResponse}>
          {this.props.t("additional.confirm")}
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

export default withTranslation("registration")(RegisterAdditionalConfirm);
