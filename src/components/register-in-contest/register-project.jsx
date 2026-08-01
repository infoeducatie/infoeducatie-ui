"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import _ from "lodash";
import { FormControl, ControlLabel, FormGroup, Button } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import FormMixin from "../../mixins/form"


const RegisterProject = createLegacyComponent({
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
          <ControlLabel>{this.props.t("project.openSource")}</ControlLabel>
          <FormControl componentClass="select"
                       onChange={this.onOpenSourceChange}>
            <option value="true">{this.props.t("common.yes")}</option>
            <option value="false">{this.props.t("common.no")}</option>
          </FormControl>
          <FormControl.Feedback />
        </FormGroup>;
    }
    return openSource;
  },

  renderWantsOpenSource() {
    let wantsOpenSource;

    if (this.state.project.category !== "multimedia") {
      if (this.state.project.open_source === "true") {
        wantsOpenSource = ([
          <div key="open-source-code">
            <FormGroup>
              <ControlLabel>{this.props.t("project.sourceLink")}</ControlLabel>
              <FormControl type="url"
                     placeholder="https://github.com/infoeducatie/infoeducatie-ui"
                     title={this.props.t("project.sourceRule")}
                     pattern="https?:\/\/github.com\/[^\/]+\/[^\/]+(\.git)?(\/)?"
                     onChange={this.onChange.bind(this, "source_url")}
                     required />
              <FormControl.Feedback />
            </FormGroup>,
            <p className="alert alert-warning">
              {this.props.t("project.sourceNotice")}&nbsp;
              <a target="_blank" href="https://blog.infoeducatie.ro/tutorial/2015/04/14/github-101.html" rel="noreferrer">{this.props.t("project.detailsLink")}</a>.
            </p>
          </div>
        ]);
      } else {
        wantsOpenSource = ([
          <div key="not-open-source-code">
            <FormGroup>
              <ControlLabel>{this.props.t("project.closedReason")}</ControlLabel>
              <FormControl
                     placeholder={this.props.t("project.closedReasonPlaceholder")}
                     onChange={this.onChange.bind(this, "closed_source_reason")}
                     pattern="(.+)"
                     required />
              <FormControl.Feedback />
            </FormGroup>,
            <FormGroup>
              <ControlLabel>{this.props.t("project.githubUsername")}</ControlLabel>
              <FormControl
                     placeholder="infoeducatie"
                     onChange={this.onChange.bind(this, "github_username")}
                     pattern="([^\/]+)"
                     required />
              <FormControl.Feedback />
            </FormGroup>,
            <p className="alert alert-warning">
              {this.props.t("project.privateSourceNotice")}&nbsp;
              <a target="_blank" href="https://blog.infoeducatie.ro/tutorial/2015/04/14/github-101.html" rel="noreferrer">{this.props.t("project.detailsLink")}</a>.
            </p>
          </div>
        ]);
      }
    } else {
      wantsOpenSource = ([
        <div key="open-source-multimedia">
          <FormGroup>
            <ControlLabel>{this.props.t("project.sourceLink")}</ControlLabel>
            <FormControl type="url"
                   placeholder="https://www.youtube.com/watch?v=Pa6gIc7spVc"
                   onChange={this.onChange.bind(this, "source_url")}
                   pattern="https?:\/\/(youtu\.be|(www\.)?youtube\.com)\/watch(\.php)?.{0,2}\?v=([a-zA-Z0-9\-_]+)"
                   required />
             <FormControl.Feedback />
           </FormGroup>,
          <p className="alert alert-warning">
            {this.props.t("project.youtubeNotice")}
          </p>
        </div>
      ]);
    }

    return wantsOpenSource;
  },

  render() {
    return <form onSubmit={this.onFormSubmit}>
      <FormGroup>
        <ControlLabel>{this.props.t("project.title")}</ControlLabel>
        <FormControl
          type="text"
          placeholder={this.props.t("project.titlePlaceholder")}
          onChange={this.onChange.bind(this, "title")}
          required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("project.category")}</ControlLabel>
        <FormControl componentClass="select"
               onChange={this.onCategoryChange}
               required>
          <option value="educational">{this.props.t("project.educational")}</option>
          <option value="utilitar">{this.props.t("project.utility")}</option>
          <option value="roboti">{this.props.t("public:categories.robots")}</option>
          <option value="web">{this.props.t("public:categories.web")}</option>
          <option value="multimedia">{this.props.t("public:categories.multimedia")}</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("project.description")}</ControlLabel>
        <FormControl componentClass="textarea"
               onChange={this.onChange.bind(this, "description")}
               required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("project.technicalDescription")}</ControlLabel>
        <FormControl componentClass="textarea"
               onChange={this.onChange.bind(this, "technical_description")}
               required />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{this.props.t("project.requirements")}</ControlLabel>
        <FormControl componentClass="textarea"
               onChange={this.onChange.bind(this, "system_requirements")}
               required />
        <FormControl.Feedback />
      </FormGroup>
      { this.renderOpenSource() }
      { this.renderWantsOpenSource() }
      { this.state.project.category === "web" ?
        <FormGroup>
          <ControlLabel>{this.props.t("project.homepage")}</ControlLabel>
            <FormControl type="url"
                   placeholder="http://..."
                   onChange={this.onChange.bind(this, "homepage")}
                   required />
            <FormControl.Feedback />
          </FormGroup>: null }
      <FormGroup>
        <Button type="submit"
                disabled={this.state.waitingForServerResponse}>
          {this.props.t("common.next")}
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

export default withTranslation(["registration", "public"])(RegisterProject);
