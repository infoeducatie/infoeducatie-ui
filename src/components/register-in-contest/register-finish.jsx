"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Button, FormGroup } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import FormMixin from "../../mixins/form"


const RegisterFinish = createLegacyComponent({
  displayName: "RegisterFinish",
  mixins: [FormMixin],

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <p>{this.props.t("finish.description", {
        project: this.props.pending_project_title,
      })}</p>
      <FormGroup>
        <Button type="submit"
                disabled={this.state.waitingForServerResponse}>
          {this.props.t("finish.submit")}
        </Button>
      </FormGroup>
      {this.renderErrors()}
    </form>;
  },

  getFormData() {
    return {};
  }
});

export default withTranslation("registration")(RegisterFinish);
