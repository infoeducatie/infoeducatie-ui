"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { withTranslation } from "react-i18next";

import RegisterAdditionalSearch from "./register-additional-search";
import RegisterAdditionalConfirm from "./register-additional-confirm";


const RegisterAdditionalWrapper = createLegacyComponent({
  displayName: "RegisterAdditionalWrapper",

  getInitialState() {
    return {
      additionalEmail: "",
      waitingForServerResponseAdditionalForm: false,
      hasPerformedSearch: false,
      additionalContestant: []
    };
  },

  render() {
    return <div>
      <p>{this.props.t("additional.instructions")}</p>
      <RegisterAdditionalSearch onSubmit={this.onRegisterAdditionalSearchSubmit}
                                method="GET"
                                formEndpoint="contestants.json" />
      {this.state.hasPerformedSearch ? this.renderSecondPart() : null}
    </div>;
  },

  renderSecondPart() {
    if (!this.state.additionalContestant.length) {
      return <p>{this.props.t("additional.notFound")}</p>;
    }
    let formEndpoint = `projects/${this.props.pendingProject.id}/collaborators`;
    return <div>
      <p>{this.props.t("additional.found", {
        name: this.state.additionalContestant[0].name,
        school: this.state.additionalContestant[0].school_name,
      })}</p>

      <RegisterAdditionalConfirm onSubmit={this.props.onSubmit}
                                 formEndpoint={formEndpoint}
                                 access_token={this.props.access_token}
                                 contestantId={this.state.additionalContestant[0].id} />
    </div>;
  },

  onRegisterAdditionalSearchSubmit(data) {
    this.setState({
      hasPerformedSearch: true,
      additionalContestant: data
    });
  }
});

export default withTranslation("registration")(RegisterAdditionalWrapper);
