"use strict";

import request from "@lib/request";
import createLegacyComponent from "@lib/create-legacy-component";
import { Col, Grid, Row } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

function resolveImageUrl(imageUrl) {
  try {
    return new URL(imageUrl, window.config.API_URL).toString();
  } catch {
    return imageUrl;
  }
}

function SponsorLogo({ sponsor }) {
  const logo = (
    <>
      <img
        alt=""
        decoding="async"
        height="120"
        loading="lazy"
        src={resolveImageUrl(sponsor.image_url)}
        width="240"
      />
      <span className="sponsor-title">{sponsor.title}</span>
    </>
  );

  if (!sponsor.website_url) {
    return <div className="sponsor-logo">{logo}</div>;
  }

  return (
    <a
      className="sponsor-logo"
      href={sponsor.website_url}
      rel="noreferrer"
      target="_blank"
    >
      {logo}
    </a>
  );
}

const SponsorsSection = createLegacyComponent({
  displayName: "SponsorsSection",

  getInitialState() {
    return {
      hasErrored: false,
      isLoading: true,
      tiers: [],
    };
  },

  componentDidMount() {
    this.loadSponsors();
  },

  componentDidUpdate(previousProps) {
    if (previousProps.language !== this.props.language) {
      this.loadSponsors();
    }
  },

  loadSponsors() {
    this.setState({ hasErrored: false, isLoading: true });

    request({
      method: "GET",
      url: window.config.API_URL + "sponsors.json",
      data: { locale: this.props.language },
      success: this.onSuccess,
      error: this.onError,
    });
  },

  onSuccess(data) {
    if (!Array.isArray(data)) {
      this.onError();
      return;
    }

    this.setState({ hasErrored: false, isLoading: false, tiers: data });
  },

  onError() {
    this.setState({ hasErrored: true, isLoading: false });
  },

  renderStatus() {
    if (this.state.isLoading) {
      return <p className="sponsors-status" role="status">
        {this.props.t("sponsors.loading")}
      </p>;
    }

    if (this.state.hasErrored) {
      return <div className="sponsors-status" role="alert">
        <p>{this.props.t("sponsors.error")}</p>
        <button onClick={this.loadSponsors} type="button">
          {this.props.t("sponsors.retry")}
        </button>
      </div>;
    }

    if (!this.state.tiers.length) {
      return <p className="sponsors-status" role="status">
        {this.props.t("sponsors.empty")}
      </p>;
    }

    return null;
  },

  renderTier(tier) {
    return <section className="sponsor-tier" key={tier.id}>
      <h3>{tier.title}</h3>
      <div className="logos">
        {tier.sponsors.map((sponsor) => (
          <SponsorLogo key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </section>;
  },

  render() {
    return <div className="sponsors-section-wrapper">
      <Grid className="sponsors-section">
        <Row className="small-spacing" />
        <Row>
          <Col xs={12}>
            <h2>{this.props.t("sponsors.title")}</h2>
            {this.renderStatus()}
            {this.state.tiers.map(this.renderTier)}
          </Col>
        </Row>
        <Row className="small-spacing" />
      </Grid>
    </div>;
  },
});

export default withTranslation("home")(SponsorsSection);
