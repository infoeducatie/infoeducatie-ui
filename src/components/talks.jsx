"use strict";

import ctx from "classnames";
import {Grid, Row, Col} from "@ui/bootstrap";
import createLegacyComponent from "@lib/create-legacy-component";

import "../main.less";
import ajax from "../lib/ajax"
import gravatar from "../lib/gravatar"
import CloudCount from "./cloud-count"
import EditionSelector from "./edition-selector";
import Header from "./header";


export default createLegacyComponent({
  displayName: "Talks",

  getInitialState() {
    return {
      talks: [],
      selectedEdition: this.props.edition.name,
      hasErrored: false,
      isLoading: true
    };
  },

  componentDidMount() {
    this.getTalks();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.edition.name !== this.props.edition.name) {
      this.setState({ selectedEdition: nextProps.edition.name });
    }
  },

  render() {
    return <div className="talks">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      current={this.props.current}
                      language={this.props.language}
                      changeLanguage={this.props.changeLanguage}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h1>Seminarii InfoEducație</h1>
              <h2>Ediția {this.state.selectedEdition}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        <Row className="small-spacing" />
        <Row>
          <Col xs={12}>
            <div className="edition-filter">
            <label className="control-label" htmlFor="talks-edition">
              Ediția afișată
            </label>
            <EditionSelector onCallback={this.onEditionChange}
                             id="talks-edition"
                             ariaLabel="Ediția afișată"
                             filter="has_contestants"/>
            </div>
          </Col>
        </Row>
        {this.state.isLoading ? <p className="page-status" role="status">Se încarcă seminariile...</p> : null}
        {this.state.hasErrored ? <p className="page-status alert alert-warning" role="alert">Seminariile nu pot fi încărcate momentan.</p> : null}
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
              Discută pe forum <CloudCount count={talk.comments_count} />
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
      <img alt={`Fotografie ${author.name}`} loading="lazy" src={gravatar(author.email_md5)} />
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
    this.setState({ selectedEdition: edition.name });
  },

  getTalks(editionId=undefined) {
    this.setState({ hasErrored: false, isLoading: true });
    let data = {};
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
