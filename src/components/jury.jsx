"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import request from "@lib/request";
import { Grid, Row } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import JudgingCriteria from "./judging-criteria";
import JuryDescription from "./jury-description";
import SecondaryHero from "./secondary-hero";

import "../main.less";

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
      hasErrored: false,
      isLoading: true,
    };
  },

  componentDidMount() {
    this.loadJury();
  },

  componentDidUpdate(previousProps) {
    if (previousProps.language !== this.props.language) {
      this.loadJury();
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
      <SecondaryHero headerProps={this.props}>
        <h1>{this.props.t("jury.title")}</h1>
        <h2>{this.props.t("edition.label", { edition: editionName })}</h2>
      </SecondaryHero>

      <Grid className="white-section">
        {this.renderStatus()}
        {this.state.categories.map(this.renderCategory)}
      </Grid>

      <JudgingCriteria language={this.props.language} />
    </div>;
  },
});

export default withTranslation("public")(Jury);
