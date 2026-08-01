"use strict";

import ctx from "classnames";
import {Grid, Row, Col} from "@ui/bootstrap";
import createLegacyComponent from "@lib/create-legacy-component";
import { withTranslation } from "react-i18next";

import "../main.less";
import ajax from "../lib/ajax"
import gravatar from "../lib/gravatar"
import CloudCount from "./cloud-count"
import EditionSelector from "./edition-selector";
import SecondaryHero from "./secondary-hero";


const Talks = createLegacyComponent({
  displayName: "Talks",

  getInitialState() {
    return {
      talks: [],
      selectedEdition: this.props.edition.name ||
        this.props.edition.count ||
        this.props.edition.year,
      selectedEditionId: this.props.edition.id,
      hasErrored: false,
      isLoading: true
    };
  },

  componentDidMount() {
    this.getTalks();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.edition.id !== this.props.edition.id) {
      this.setState({
        selectedEdition: nextProps.edition.name ||
          nextProps.edition.count ||
          nextProps.edition.year,
        selectedEditionId: nextProps.edition.id,
      });
    }
  },

  componentDidUpdate(previousProps) {
    if (previousProps.language !== this.props.language) {
      this.getTalks(this.state.selectedEditionId);
    }
  },

  render() {
    return <div className="talks">
      <SecondaryHero headerProps={this.props}>
        <h1>{this.props.t("talks.title")}</h1>
        <h2>{this.props.t("edition.label", { edition: this.state.selectedEdition })}</h2>
      </SecondaryHero>
      <Grid>
        <Row className="small-spacing" />
        <Row>
          <Col xs={12}>
            <div className="edition-filter">
            <label className="control-label" htmlFor="talks-edition">
              {this.props.t("edition.displayed")}
            </label>
            <EditionSelector onCallback={this.onEditionChange}
                             id="talks-edition"
                             ariaLabel={this.props.t("edition.displayed")}
                             filter="has_contestants"/>
            </div>
          </Col>
        </Row>
        {this.state.isLoading ? <p className="page-status" role="status">{this.props.t("talks.loading")}</p> : null}
        {this.state.hasErrored ? <p className="page-status alert alert-warning" role="alert">{this.props.t("talks.error")}</p> : null}
        {this.state.talks.map(this.renderTalk)}
      </Grid>
   </div>;
  },

  renderTalk(talk, index) {
    let colors = ["green", "orange", "black"];
    let className = ctx("talk-container", colors[index % colors.length]);

    return <Row className="talk-row" key={index}>
      <Col mdOffset={1} md={10} smOffset={1} sm={10}>
        <article className={className}>
          <div className="talk-authors">
            <ul className="list-inline">
              {talk.users.map(this.renderAuthorImage)}
            </ul>
          </div>
          <div className="talk-copy">
            <h3 className="talk-title">{talk.title}</h3>
            <p className="talk-description">{talk.description}</p>
            <a className="read-more" href={talk.discourse_url}>
              {this.props.t("talks.discuss")} <CloudCount count={talk.comments_count} />
            </a>
            <ul className="list-unstyled author-list">
              {talk.users.map(this.renderAuthorText)}
            </ul>
          </div>
        </article>
      </Col>
    </Row>;
  },

  renderAuthorImage(author, index) {
    return <li className="author-image" key={index}>
      <img alt={this.props.t("talks.authorPhoto", { name: author.name })} loading="lazy" src={gravatar(author.email_md5)} />
    </li>;
  },

  renderAuthorText(author, index) {
    return <li key={index} className="author-text">
      <h4 className="author-name">{author.name}</h4>
      <p className="author-job">{author.job}</p>
    </li>;
  },

  onEditionChange(edition) {
    this.getTalks(edition.id);
    this.setState({
      selectedEdition: edition.name,
      selectedEditionId: edition.id,
    });
  },

  getTalks(editionId=undefined) {
    this.setState({ hasErrored: false, isLoading: true });
    let data = { locale: this.props.language };
    if (editionId) {
      data.edition = editionId;
    }

    ajax({
      endpoint: "talks.json",
      data: data,
      success: (data) => { this.setState({ talks: data, isLoading: false }); },
      error: () => { this.setState({ hasErrored: true, isLoading: false }); }
    });
  }
});

export default withTranslation("public")(Talks);
