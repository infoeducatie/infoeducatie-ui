"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Nav, NavItem, Row, Col, Grid } from "@ui/bootstrap";
import { LinkContainer } from "@ui/router-bootstrap";

import "../main.less";
import Facebook from "../../assets/img/icons/fb.png";
import Twitter from "../../assets/img/icons/twitter.png";
import Github from "../../assets/img/icons/github.png";

import NewsletterForm from "./newsletter-form";

export default createLegacyComponent({
  displayName: "Footer",

  renderResultsContestants() {
    let lastEditionWithResults = this.props.current.last_edition_with_results;

    if (lastEditionWithResults &&
        this.props.current.edition.id != lastEditionWithResults.id) {
      return <LinkContainer to="/rezultate"><NavItem>Rezultate</NavItem></LinkContainer>;
    } else {
      return <LinkContainer to="/participanti"><NavItem>Participanți</NavItem></LinkContainer>;
    }
  },

  render() {
    return <Grid className="footer">
      <Row className="small-spacing" />
      <Row className="small-spacing second" />
      <Row>
        <Col xs={12}>
          <nav aria-label="Navigație secundară" className="navbar-default">
            <Nav className="navbar-nav">
              <NavItem target="_blank" href="https://community.infoeducatie.ro">Forum</NavItem>
              <NavItem target="_blank" href="https://blog.infoeducatie.ro">Blog</NavItem>
              { this.renderResultsContestants() }
              <LinkContainer to="/poze"><NavItem>Fotografii</NavItem></LinkContainer>
              <LinkContainer to="/contacte"><NavItem>Contact</NavItem></LinkContainer>
            </Nav>
          </nav>
        </Col>
      </Row>
      <Row className="small-spacing" />
      <Row className="call-to-action">
        <Col sm={6} className="left">
          <NewsletterForm />
        </Col>
        <Col sm={6} className="text-center">
          <Row>
            <Col xs={12}>
              <ul className="social-logos list-inline">
                <li><a href="https://www.facebook.com/infoeducatie" target="_blank" rel="noreferrer"><img alt="Facebook" height="58" src={Facebook} width="58" /></a></li>
                <li><a href="https://twitter.com/infoeducatie" target="_blank" rel="noreferrer"><img alt="InfoEducație pe X" height="58" src={Twitter} width="58" /></a></li>
                <li><a href="https://github.com/infoeducatie" target="_blank" rel="noreferrer"><img alt="InfoEducație pe GitHub" height="58" src={Github} width="59" /></a></li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="copyright">
                &copy; {new Date().getFullYear()} InfoEducație
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>;
  }
});
