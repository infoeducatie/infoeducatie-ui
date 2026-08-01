"use strict";

import request from "@lib/request";

import createLegacyComponent from "@lib/create-legacy-component";

import ctx from "classnames";
import {Grid, Row, Col} from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import gravatar from "../lib/gravatar";
import SecondaryHero from "./secondary-hero";

import "../main.less";


const Alumni = createLegacyComponent({
  displayName: "Alumni",

  getInitialState() {
    return {
      alumni: [],
      hasErrored: false,
      isLoading: true
    };
  },

  componentDidMount() {
    this.loadAlumni();
  },

  componentDidUpdate(previousProps) {
    if (previousProps.language !== this.props.language) {
      this.loadAlumni();
    }
  },

  loadAlumni() {
    this.setState({ hasErrored: false, isLoading: true });

    request({
      method: "GET",
      url: window.config.API_URL + "alumni.json",
      data: { locale: this.props.language },
      success: this.onSuccess,
      error: this.onError
    });
  },

  onSuccess(data) {
    this.setState({
      alumni: data,
      isLoading: false
    });
  },

  onError() {
    this.setState({ hasErrored: true, isLoading: false });
  },

  renderAlumnus(alumnus, index) {
    let colors = ["green", "orange", "black"];
    let className = ctx("alumnus-container", colors[index % colors.length]);
    let editions = alumnus.editions.map(function(edition) {
                      return parseInt(edition.name);
                   });

    return <Row className="alumnus-row" key={index}>
      <Col mdOffset={1} md={10} smOffset={1} sm={10}>
        <article className={className}>
          <div className="alumnus-image">
            <img
              alt=""
              height="150"
              loading="lazy"
              src={gravatar(alumnus.user.email_md5)}
              width="150"
            />
          </div>
          <div className="alumnus-copy">
            <p className="alumnus-description">{alumnus.description}</p>
            <h2 className="alumnus-name">
              {alumnus.user.first_name} {alumnus.user.last_name}
            </h2>
            <p className="alumnus-position">{alumnus.user.job}</p>
            <p className="alumnus-editions" aria-label={this.props.t("alumni.participatingEditions")}>
              {editions.sort().reverse().map(function(edition) {
                return <span key={edition}>{edition}</span>;
              })}
            </p>
          </div>
        </article>
      </Col>
    </Row>;
  },

  render() {
    return <div className="alumni">
      <SecondaryHero headerProps={this.props} tone="gray">
        <h1>{this.props.t("alumni.title")}</h1>
        <h2>{this.props.t("alumni.subtitle")}</h2>
      </SecondaryHero>
      <Grid>
        {this.state.isLoading ? <p className="page-status" role="status">{this.props.t("alumni.loading")}</p> : null}
        {this.state.hasErrored ? <p className="page-status alert alert-warning" role="alert">{this.props.t("alumni.error")}</p> : null}
        {this.state.alumni.map(this.renderAlumnus)}
      </Grid>
   </div>;
  }
});

export default withTranslation("public")(Alumni);
