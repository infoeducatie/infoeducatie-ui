"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { getLocalizedPath } from "@lib/localized-routes";
import { primaryNavigation } from "@lib/public-navigation";
import { Col, Grid, Nav, NavItem, Row } from "@ui/bootstrap";
import { LinkContainer } from "@ui/router-bootstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import "../main.less";
import Facebook from "../../assets/img/icons/fb.png";
import Github from "../../assets/img/icons/github.png";
import XLogo from "../../assets/img/icons/x.svg";
import NewsletterForm from "./newsletter-form";

const Footer = createLegacyComponent({
  displayName: "Footer",

  render() {
    const { t } = this.props;

    return (
      <footer className="footer-wrapper">
        <Grid className="footer">
          <Row className="footer-main">
            <Col className="footer-brand" md={3}>
              <Link className="footer-logo" to={getLocalizedPath("home")}>
                <span>InfoEducație</span>
              </Link>
              <p>{t("footer.brandDescription")}</p>
              <ul className="social-logos">
                <li>
                  <a
                    href="https://www.facebook.com/infoeducatie"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img alt={t("footer.facebook")} src={Facebook} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/infoeducatie"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img alt={t("footer.x")} className="x-logo" src={XLogo} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/infoeducatie"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img alt={t("footer.github")} src={Github} />
                  </a>
                </li>
              </ul>
            </Col>

            <Col className="footer-pages" md={4}>
              <h2>{t("footer.pages")}</h2>
              <nav aria-label={t("footer.navigationLabel")}>
                <Nav className="footer-nav">
                  {primaryNavigation.map(([route, label]) => (
                    <LinkContainer key={route} to={getLocalizedPath(route)}>
                      <NavItem>{t(`navigation.${label}`)}</NavItem>
                    </LinkContainer>
                  ))}
                </Nav>
              </nav>
            </Col>

            <Col className="footer-community" md={2}>
              <h2>{t("footer.community")}</h2>
              <ul>
                <li>
                  <a
                    href="https://community.infoeducatie.ro"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {t("navigation.forum")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/Ef6yav7wAs"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {t("navigation.discord")}
                  </a>
                </li>
              </ul>
            </Col>

            <Col className="footer-newsletter" md={3}>
              <h2>{t("footer.stayConnected")}</h2>
              <p>{t("footer.newsletterDescription")}</p>
              <NewsletterForm />
            </Col>
          </Row>

          <Row className="footer-bottom">
            <Col xs={12}>
              <p className="copyright">
                {t("footer.copyright", { year: new Date().getFullYear() })}
              </p>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  },
});

export default withTranslation("common")(Footer);
