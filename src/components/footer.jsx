"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { getLocalizedPath } from "@lib/localized-routes";
import { primaryNavigation } from "@lib/public-navigation";
import { Col, Grid, Nav, NavItem, Row } from "@ui/bootstrap";
import { LinkContainer } from "@ui/router-bootstrap";
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
                {primaryNavigation.map(([route, label]) => (
                  <LinkContainer key={route} to={getLocalizedPath(route)}>
                    <NavItem>{t(`navigation.${label}`)}</NavItem>
                  </LinkContainer>
                ))}
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
                      href="https://x.com/infoeducatie"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        alt={t("footer.x")}
                        className="x-logo"
                        height="58"
                        src={XLogo}
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
