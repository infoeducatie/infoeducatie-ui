"use strict";

import DeepLinkedStateMixin from "react-deep-link-state";
import React from "react";
import { Input, ButtonInput } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterProject",
  mixins: [FormMixin, DeepLinkedStateMixin],

  getDefaultProps() {
    return {
      formEndpoint: "projects.json"
    };
  },

  getInitialState() {
    return {
      project: {
        /*eslint-disable */
        title: "",
        category_id: "3",
        description: "",
        technical_description: "",
        system_requirements: "",
        source_url: "",
        homepage: ""
        /*eslint-enable */
      }
    };
  },

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <Input
        type="text"
        placeholder="Catalog Școlar"
        label="Titlul Lucrării"
        valueLink={this.deepLinkState(["project", "title"])}
        required />
      <Input type="select"
             label="Gen"
             valueLink={this.deepLinkState(["project", "category_id"])}
             required>
        <option value="0">Software Educațional</option>
        <option value="1">Software Utilitar</option>
        <option value="2">Roboți</option>
        <option value="3">Web</option>
        <option value="4">Multimedia</option>
      </Input>
      <Input type="textarea"
             label="Descriere"
             valueLink={this.deepLinkState(["project", "description"])}
             required />
      <Input type="textarea"
             label="Descriere Tehnică"
             valueLink={this.deepLinkState(["project", "technical_description"])}
             required />
      <Input type="textarea"
             label="Cerințe de sistem"
             valueLink={this.deepLinkState(["project", "system_requirements"])}
             required />
      <Input type="url"
             placeholder="http://..."
             valueLink={this.deepLinkState(["project", "source_url"])}
             label="Adresa lucrării" />
      <Input type="url"
             placeholder="http://..."
             label="Adresa surselor"
             valueLink={this.deepLinkState(["project", "homepage"])} />
      <ButtonInput type="submit"
                   value="Pasul următor"
                   disabled={this.state.waitingForServerResponse} />
      {this.renderErrors()}
    </form>;
  },

  getFormData() {
    return {};
  }
});
