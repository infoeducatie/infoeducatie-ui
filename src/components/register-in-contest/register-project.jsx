"use strict";

import React from "react";
import _ from "lodash";
import { FormControl, ControlLabel, FormGroup, Button } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterProject",
  mixins: [FormMixin],

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
        category: "educational",
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

  onChange(field, event) {
    let project = _.clone(this.state.project);
    project[field] = event.target.value;
    this.setState({ project: project });
  },

  renderOpenSource() {
    let openSource = null;
    if (this.state.project.category !== "multimedia") {
        openSource = <FormGroup key="a">
          <ControlLabel>Ești de acord ca proiectul să fie public (open-source) ? *</ControlLabel>
          <FormControl componentClass="select"
                       onChange={this.onOpenSourceChange}>
            <option value="true">Da</option>
            <option value="false">Nu</option>
          </FormControl>
          <FormControl.Feedback />
        </FormGroup>;
    }
    return openSource;
  },

  renderWantsOpenSource() {
    let wantsOpenSource = "";

    if (this.state.project.category !== "multimedia") {
      if (this.state.project.open_source === "true") {
        wantsOpenSource = ([
          <div key="open-source-code">
            <FormGroup>
              <ControlLabel>Link către surse și documentație</ControlLabel>
              <FormControl type="url"
                     placeholder="https://github.com/infoeducatie/infoeducatie-ui"
                     title="Sursele proiectului trebuie să fie încărcate și accesibile pe GitHub"
                     pattern="https?:\/\/github.com\/[^\/]+\/[^\/]+(\.git)?(\/)?"
                     onChange={this.onChange.bind(this, "source_url")}
                     required />
              <FormControl.Feedback />
            </FormGroup>,
            <p className="alert alert-warning">
              Sursele proiectului trebuie să fie încărcate pe acel repository.
              În cazul în care întâmpini probleme poți găsi mai multe detalii&nbsp;
              <a target="_blank" href="http://blog.infoeducatie.ro/tutorial/2015/04/14/github-101.html">aici</a>.
            </p>
          </div>
        ]);
      } else {
        wantsOpenSource = ([
          <div key="not-open-source-code">
            <FormGroup>
              <ControlLabel>Care este motivul pentru care dorești ca proiectul tău să nu fie public (open-source) ? *</ControlLabel>
              <FormControl
                     placeholder="Îmi este mult prea frică că îmi va fura un om rău codul"
                     onChange={this.onChange.bind(this, "closed_source_reason")}
                     pattern="(.+)"
                     required />
              <FormControl.Feedback />
            </FormGroup>,
            <FormGroup>
              <ControlLabel>Care este numele tau de utilizator pe GitHub ? *</ControlLabel>
              <FormControl
                     placeholder="infoeducatie"
                     onChange={this.onChange.bind(this, "github_username")}
                     pattern="([^\/]+)"
                     required />
              <FormControl.Feedback />
            </FormGroup>,
            <p className="alert alert-warning">
              Dacă nu dorești să încarci sursele pe GitHub poți să trimiți un link cu ele pe adresa contact@infoeducatie.ro
              În cazul în care întâmpini probleme cu încărcatul surselor pe GitHub poți găsi mai multe detalii&nbsp;
              <a target="_blank" href="http://blog.infoeducatie.ro/tutorial/2015/04/14/github-101.html">aici</a>.
            </p>
          </div>
        ]);
      }
    } else {
      wantsOpenSource = ([
        <div key="open-source-multimedia">
          <FormGroup>
            <ControlLabel>Link către surse și documentație</ControlLabel>
            <FormControl type="url"
                   placeholder="https://www.youtube.com/watch?v=Pa6gIc7spVc"
                   onChange={this.onChange.bind(this, "source_url")}
                   pattern="https?:\/\/(youtu\.be|(www\.)?youtube\.com)\/watch(\.php)?.{0,2}\?v=([a-zA-Z0-9\-_]+)"
                   required />
             <FormControl.Feedback />
           </FormGroup>,
          <p className="alert alert-warning">
            Proiectul trebuie să fie încărcat și accesibil pe Youtube.
          </p>
        </div>
      ]);
    }

    return wantsOpenSource;
  },

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <FormGroup>
        <ControlLabel>Titlul Lucrării *</ControlLabel>
        <FormControl
          type="text"
          placeholder="Catalog Școlar"
          onChange={this.onChange.bind(this, "title")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Categorie *</ControlLabel>
        <FormControl componentClass="select"
               onChange={this.onCategoryChange}
               required>
          <option value="educational">Software Educațional</option>
          <option value="utilitar">Software Utilitar</option>
          <option value="roboti">Roboți</option>
          <option value="web">Web</option>
          <option value="multimedia">Multimedia</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Descriere *</ControlLabel>
        <FormControl componentClass="textarea"
               onChange={this.onChange.bind(this, "description")}
               required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Descriere Tehnică *</ControlLabel>
        <FormControl componentClass="textarea"
               onChange={this.onChange.bind(this, "technical_description")}
               required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Cerințe de sistem *</ControlLabel>
        <FormControl componentClass="textarea"
               onChange={this.onChange.bind(this, "system_requirements")}
               required />
        <FormControl.Feedback />
      </FormGroup>
      { this.renderOpenSource() }
      { this.renderWantsOpenSource() }
      { this.state.project.category === "web" ?
        <FormGroup>
          <ControlLabel>Adresa lucrării *</ControlLabel>
            <FormControl type="url"
                   placeholder="http://..."
                   onChange={this.onChange.bind(this, "homepage")}
                   required />
            <FormControl.Feedback />
          </FormGroup>: null }
      <FormGroup>
        <Button type="submit"
                disabled={this.state.waitingForServerResponse}>
          Pasul următor
        </Button>
      </FormGroup>
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
