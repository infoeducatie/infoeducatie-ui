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
        homepage: "",
        open_source: "true",
        closed_source_reason: "",
        github_username: ""
        /*eslint-enable */
      }
    };
  },

  renderOpenSource() {
    let openSource = null;
    if (this.state.project.category !== "multimedia") {
        openSource = <Input type="select"
                            label="Ești de acord ca proiectul să fie public (open-source) ? *"
                            onChange={this.onOpenSourceChange}>
          <option value="true">Da</option>
          <option value="false">Nu</option>
        </Input>;
    }
    return openSource;
  },

  renderWantsOpenSource() {
    let wantsOpenSource = "";

    if (this.state.project.category !== "multimedia") {
      if (this.state.project.open_source === "true") {
        wantsOpenSource = ([
            <Input type="url"
                   placeholder="https://github.com/infoeducatie/infoeducatie-ui"
                   title="Sursele proiectului trebuie să fie încărcate și accesibile pe GitHub"
                   pattern="https?:\/\/github.com\/[^\/]+\/[^\/]+(\.git)?(\/)?"
                   valueLink={this.deepLinkState(["project", "source_url"])}
                   label="Link către surse și documentație"
                   required />,
            <p className="alert alert-warning">
              Sursele proiectului trebuie să fie încărcate și accesibile pe
              GitHub. În cazul în care întâmpini probleme poți găsi mai multe detalii&nbsp;
              <a target="_blank" href="http://blog.infoeducatie.ro/tutorial/2015/04/14/github-101.html">aici</a>.
            </p>
        ]);
      } else {
        wantsOpenSource = ([
            <Input type="input"
                   placeholder="Îmi este mult prea frică că îmi va fura un om rău codul"
                   valueLink={this.deepLinkState(["project", "closed_source_reason"])}
                   label="Care este motivul pentru care dorești ca proiectul tău să nu fie public (open-source) ? *"
                   pattern="(.+)"
                   required />,
            <Input type="input"
                   placeholder="infoeducatie"
                   valueLink={this.deepLinkState(["project", "github_username"])}
                   label="Care este numele tau de utilizator pe GitHub ? *"
                   pattern="([^\/]+)"
                   required />,
            <p className="alert alert-warning">
              Când se va aproba proiectul vei primi prin email adresa de la un
              repository privat de GitHub unde vei avea acces tu împreună cu juriul.
              Sursele proiectului trebuie să fie încărcate pe acolo.
              În cazul în care întâmpini probleme poți găsi mai multe detalii&nbsp;
              <a target="_blank" href="http://blog.infoeducatie.ro/tutorial/2015/04/14/github-101.html">aici</a>.
            </p>
        ]);
      }
    } else {
      wantsOpenSource = wantsOpenSource = ([
        <Input type="url"
               placeholder="https://www.youtube.com/watch?v=Pa6gIc7spVc"
               valueLink={this.deepLinkState(["project", "source_url"])}
               label="Link către surse și documentație"
               pattern="https?:\/\/(youtu\.be|(www\.)?youtube\.com)\/watch(\.php)?.{0,2}\?v=([a-zA-Z0-9\-_]+)"
               required />,
        <p className="alert alert-warning">
          Proiectul trebuie să fie încărcat și accesibil pe Youtube.
        </p>
      ]);
    }

    return wantsOpenSource;
  },

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <Input
        type="text"
        placeholder="Catalog Școlar"
        label="Titlul Lucrării *"
        valueLink={this.deepLinkState(["project", "title"])}
        required />
      <Input type="select"
             label="Categorie *"
             onChange={this.onCategoryChange}
             required>
        <option value="educational">Software Educațional</option>
        <option value="utilitar">Software Utilitar</option>
        <option value="roboti">Roboți</option>
        <option value="web">Web</option>
        <option value="multimedia">Multimedia</option>
      </Input>
      <Input type="textarea"
             label="Descriere *"
             valueLink={this.deepLinkState(["project", "description"])}
             required />
      <Input type="textarea"
             label="Descriere Tehnică *"
             valueLink={this.deepLinkState(["project", "technical_description"])}
             required />
      <Input type="textarea"
             label="Cerințe de sistem *"
             valueLink={this.deepLinkState(["project", "system_requirements"])}
             required />
      { this.renderOpenSource() }
      { this.renderWantsOpenSource() }
      { this.state.project.category === "web" ?
        <Input type="url"
               placeholder="http://..."
               label="Adresa lucrării *"
               valueLink={this.deepLinkState(["project", "homepage"])}
               required /> : null }
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
  },

  onCategoryChange(event) {
    let projectState = _.clone(this.state.project);
    projectState.category = event.currentTarget.value;

    if (projectState.category !== "web") {
      projectState.homepage = "";
    }

    if (projectState.category === "multimedia") {
      projectState.open_source = "true";
      projectState.closed_source_reason = "";
      projectState.github_username = "";
      projectState.source_url = "";
    }

    this.setState({project: projectState});
  },

  onOpenSourceChange(event) {
    let projectState = _.clone(this.state.project);
    projectState.open_source = event.currentTarget.value;
    projectState.closed_source_reason = "";
    projectState.github_username = "";
    projectState.source_url = "";
    this.setState({project: projectState});
  }
});
