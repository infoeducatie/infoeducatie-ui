"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import request from "@lib/request";
import { Grid, Col, Row } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import DefaultDocument from "../../assets/img/icons/doc.png";

function resolveAssetUrl(assetUrl) {
  if (!assetUrl) return null;

  try {
    return new URL(assetUrl, window.config.API_URL).toString();
  } catch {
    return assetUrl;
  }
}

const Jury = createLegacyComponent({
  displayName: "Jury",

  getInitialState() {
    return {
      categories: [],
      criteria: [],
      criteriaHasErrored: false,
      criteriaIsLoading: true,
      hasErrored: false,
      isLoading: true,
    };
  },

  componentDidMount() {
    this.loadJury();
    this.loadCriteria();
  },

  componentDidUpdate(previousProps) {
    if (previousProps.language !== this.props.language) {
      this.loadJury();
      this.loadCriteria();
    }
  },

  loadJury() {
    this.setState({ hasErrored: false, isLoading: true });

    request({
      method: "GET",
      url: window.config.API_URL + "jury.json",
      data: { locale: this.props.language },
      success: this.onJuryLoaded,
      error: this.onJuryError,
    });
  },

  onJuryLoaded(data) {
    if (!Array.isArray(data)) {
      this.onJuryError();
      return;
    }

    const categories = data.map((category) => ({
      ...category,
      icon_url: resolveAssetUrl(category.icon_url),
      members: Array.isArray(category.members)
        ? category.members.map((member) => ({
          ...member,
          photo_url: resolveAssetUrl(member.photo_url),
        }))
        : [],
    }));

    this.setState({ categories, hasErrored: false, isLoading: false });
  },

  onJuryError() {
    this.setState({ hasErrored: true, isLoading: false });
  },

  loadCriteria() {
    this.setState({ criteriaHasErrored: false, criteriaIsLoading: true });

    request({
      method: "GET",
      url: window.config.API_URL + "judging_criteria.json",
      data: { locale: this.props.language },
      success: this.onCriteriaLoaded,
      error: this.onCriteriaError,
    });
  },

  onCriteriaLoaded(data) {
    if (!Array.isArray(data)) {
      this.onCriteriaError();
      return;
    }

    const criteria = data.map((criterion) => ({
      ...criterion,
      document_url: resolveAssetUrl(criterion.document_url),
    }));

    this.setState({
      criteria,
      criteriaHasErrored: false,
      criteriaIsLoading: false,
    });
  },

  onCriteriaError() {
    this.setState({ criteriaHasErrored: true, criteriaIsLoading: false });
  },

  renderStatus() {
    if (this.state.isLoading) {
      return <p className="page-status" role="status">
        {this.props.t("jury.loading")}
      </p>;
    }

    if (this.state.hasErrored) {
      return <p className="page-status alert alert-warning" role="alert">
        {this.props.t("jury.error")}
      </p>;
    }

    if (!this.state.categories.length) {
      return <p className="page-status" role="status">
        {this.props.t("jury.empty")}
      </p>;
    }

    return null;
  },

  renderCriteriaStatus() {
    if (this.state.criteriaIsLoading) {
      return <p className="page-status" role="status">
        {this.props.t("jury.criteriaLoading")}
      </p>;
    }

    if (this.state.criteriaHasErrored) {
      return <p className="page-status alert alert-warning" role="alert">
        {this.props.t("jury.criteriaError")}
      </p>;
    }

    if (!this.state.criteria.length) {
      return <p className="page-status" role="status">
        {this.props.t("jury.criteriaEmpty")}
      </p>;
    }

    return null;
  },

  renderCategory(category) {
    return <Row key={category.id}>
      <JuryDescription
        iconUrl={category.icon_url}
        members={category.members}
        name={category.title}
      />
    </Row>;
  },

  render() {
    const editionName = this.props.current.edition.name ||
      this.props.current.edition.count ||
      this.props.current.edition.year;
    return <div className="jury">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn}
                  current={this.props.current}
                  language={this.props.language}
                  changeLanguage={this.props.changeLanguage}
                  logout={this.props.logout} />
          <Row className="xsmall-spacing" />
          <Row>
            <Col xs={12}>
              <h1>{this.props.t("jury.title")}</h1>
              <h2>{this.props.t("edition.label", { edition: editionName })}</h2>
            </Col>
          </Row>
        </Grid>
      </div>

      <Grid className="white-section">
        {this.renderStatus()}
        {this.state.categories.map(this.renderCategory)}
      </Grid>

      <div className="orange-section-wrapper">
        <Grid className="orange-section">
          <Row>
            <Col className="block">
              <h2 className="jury-criteria-desc">
                <span className="pink-dash" />
                {this.props.t("jury.criteria")}
                <span className="pink-dash" />
              </h2>
              <div className="jury-criteria-documents">
                {this.renderCriteriaStatus()}
                {this.state.criteria.map((criterion) => (
                  <a
                    aria-label={this.props.t("jury.openCriteria", {
                      category: criterion.title,
                    })}
                    className="jury-criteria"
                    href={criterion.document_url}
                    key={criterion.id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="jury-criteria-txt">{criterion.title}</span>
                    <img alt="" height="35" src={DefaultDocument} width="50" />
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>;
  },
});

export default withTranslation("public")(Jury);
