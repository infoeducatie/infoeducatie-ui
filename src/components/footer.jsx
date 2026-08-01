"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { getLocalizedPath } from "@lib/localized-routes";
import { Col, Grid, Nav, NavItem, Row } from "@ui/bootstrap";
import { LinkContainer } from "@ui/router-bootstrap";
import { withTranslation } from "react-i18next";

import "../main.less";
import Facebook from "../../assets/img/icons/fb.png";
import Github from "../../assets/img/icons/github.png";
import Twitter from "../../assets/img/icons/twitter.png";
import NewsletterForm from "./newsletter-form";

const Footer = createLegacyComponent({
  displayName: "Footer",

  renderResultsContestants() {
    const lastEdition = this.props.current.last_edition_with_results;
    const showResults =
      lastEdition && this.props.current.edition.id != lastEdition.id;
    const route = showResults ? "results" : "participants";

    return (
      <LinkContainer to={getLocalizedPath(route)}>
        <NavItem>{this.props.t(`navigation.${route}`)}</NavItem>
      </LinkContainer>
    );
  },

  render() {
    const { t } = this.props;

    return (
      <Grid className="footer">
        <Row className="small-spacing" />
        <Row className="small-spacing second" />
        <Row>
          <Col xs={12}>
            <nav
              aria-label={t("footer.navigationLabel")}
              className="navbar-default"
            >
              <Nav className="navbar-nav">
                <NavItem
                  href="https://community.infoeducatie.ro"
                  target="_blank"
                >
                  {t("navigation.forum")}
                </NavItem>
                <NavItem
                  href="https://discord.gg/Ef6yav7wAs"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t("navigation.discord")}
                </NavItem>
                <LinkContainer to={getLocalizedPath("blog")}>
                  <NavItem>{t("navigation.blog")}</NavItem>
                </LinkContainer>
                {this.renderResultsContestants()}
                <LinkContainer to={getLocalizedPath("photos")}>
                  <NavItem>{t("navigation.photos")}</NavItem>
                </LinkContainer>
                <LinkContainer to={getLocalizedPath("contact")}>
                  <NavItem>{t("navigation.contact")}</NavItem>
                </LinkContainer>
              </Nav>
            </nav>
          </Col>
        </Row>
        <Row className="small-spacing" />
        <Row className="call-to-action">
          <Col className="left" sm={6}>
            <NewsletterForm />
          </Col>
          <Col className="text-center" sm={6}>
            <Row>
              <Col xs={12}>
                <ul className="social-logos list-inline">
                  <li>
                    <a
                      href="https://www.facebook.com/infoeducatie"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        alt={t("footer.facebook")}
                        height="58"
                        src={Facebook}
                        width="58"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/infoeducatie"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        alt={t("footer.twitter")}
                        height="58"
                        src={Twitter}
                        width="58"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/infoeducatie"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        alt={t("footer.github")}
                        height="58"
                        src={Github}
                        width="59"
                      />
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <p className="copyright">
                  {t("footer.copyright", { year: new Date().getFullYear() })}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  },
});

export default withTranslation("common")(Footer);
