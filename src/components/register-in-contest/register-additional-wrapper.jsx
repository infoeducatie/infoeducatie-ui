"use strict";

import React from "react";
import _ from "lodash";
import { Input, ButtonInput } from "react-bootstrap";

import RegisterAdditionalSearch from "./register-additional-search";


export default React.createClass({
  displayName: "RegisterAdditional",

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
      <p>Ca să adaugi un participant ca și coechipier, acesta trebuie să își
      facă un cont, să completeze primul formular iar apoi tu îl vei putea găsi
      după adresa sa de email.</p>
      <RegisterAdditionalSearch onSubmit={this.onRegisterAdditionalSearchSubmit}
                                method="GET"
                                formEndpoint="contestants.json" />
      {this.state.hasPerformedSearch ? this.renderSecondPart() : null}
    </div>;
  },

  renderSecondPart() {
    if (!this.state.additionalContestant.length) {
      return <p>Nu a fost găsit niciun participant</p>;
    }
    return <p>Celalalt formular</p>;
  },

  onRegisterAdditionalSearchSubmit(data) {
    this.setState({
      hasPerformedSearch: true,
      additionalContestant: data
    });
  }
});
