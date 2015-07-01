"use strict";

import DeepLinkedStateMixin from "react-deep-link-state";
import React from "react";
import _ from "lodash";
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
        category: "web",
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
             label="Categorie"
             valueLink={this.deepLinkState(["project", "category"])}
             required>
        <option value="educational">Software Educațional</option>
        <option value="utilitar">Software Utilitar</option>
        <option value="roboti">Roboți</option>
        <option value="web">Web</option>
        <option value="multimedia">Multimedia</option>
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
             label="Adresa surselor și a documentației"
             required />
      <Input type="url"
             placeholder="http://..."
             label="Adresa lucrării"
             valueLink={this.deepLinkState(["project", "homepage"])}
             required={this.state.project.category === "web"} />
      <ButtonInput type="submit"
                   value="Pasul următor"
                   disabled={this.state.waitingForServerResponse} />
      {this.renderErrors()}
    </form>;
  },

  getFormData() {
    let data = {};

    _.forIn(this.state.project, (value, key) => {
      let transformedKey = `project[${key}]`;
      data[transformedKey] = value;
    });

    return data;
  }
});
