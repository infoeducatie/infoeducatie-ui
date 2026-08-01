"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { getLocalizedPath } from "@lib/localized-routes";
import { primaryNavigation } from "@lib/public-navigation";
import { Nav, NavItem, Navbar } from "@ui/bootstrap";
import { LinkContainer } from "@ui/router-bootstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import "../main.less";
import ENFlag from "../../assets/img/icons/US.png";
import ROFlag from "../../assets/img/icons/RO.png";

const Header = createLegacyComponent({
  displayName: "Header",

  changeLanguage() {
    this.props.changeLanguage(this.props.language === "en" ? "ro" : "en");
  },

  renderNextLanguage() {
    const flag = this.props.language === "en" ? ROFlag : ENFlag;
    return (
      <img
        alt={this.props.t("language.nextName")}
        height="24"
        src={flag}
        width="24"
      />
    );
  },

  render() {
    const { isLoggedIn, t } = this.props;

    return (
      <div className="header">
        <div className="header-shell">
          <Link
            aria-label={t("brand")}
            className="site-logo"
            to={getLocalizedPath("home")}
          >
            <span className="site-logo-wordmark">InfoEducație</span>
          </Link>
          <Navbar
            aria-label={t("navigation.mainLabel")}
            toggleLabel={t("navigation.openMenu")}
            toggleNavKey={0}
          >
            <Nav className="navbar-nav" eventKey={0} right>
              {primaryNavigation.map(([route, label]) => (
                <LinkContainer key={route} to={getLocalizedPath(route)}>
                  <NavItem>{t(`navigation.${label}`)}</NavItem>
                </LinkContainer>
              ))}
              {isLoggedIn ? (
                <NavItem onClick={this.props.logout}>
                  {t("navigation.logout")}
                </NavItem>
              ) : null}
              {isLoggedIn ? (
                <LinkContainer to={getLocalizedPath("contestEntry")}>
                  <NavItem>{t("navigation.register")}</NavItem>
                </LinkContainer>
              ) : null}
              <NavItem
                aria-label={t("language.switchTo")}
                className="language-switch"
                onClick={this.changeLanguage}
                title={t("language.nextName")}
              >
                {this.renderNextLanguage()}
              </NavItem>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  },
});

export default withTranslation("common")(Header);
