"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { getLocalizedPath } from "@lib/localized-routes";
import { Nav, NavItem, Navbar, Row } from "@ui/bootstrap";
import { LinkContainer } from "@ui/router-bootstrap";
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

  renderParticipants() {
    return (
      <LinkContainer to={getLocalizedPath("participants")}>
        <NavItem>{this.props.t("navigation.participants")}</NavItem>
      </LinkContainer>
    );
  },

  render() {
    const { isLoggedIn, t } = this.props;

    return (
      <div className="header">
        <Row className="xxsmall-spacing" />
        <Navbar
          aria-label={t("navigation.mainLabel")}
          toggleLabel={t("navigation.openMenu")}
          toggleNavKey={0}
        >
          <Nav className="navbar-nav" eventKey={0} right>
            <LinkContainer to={getLocalizedPath("home")}>
              <NavItem>{t("navigation.home")}</NavItem>
            </LinkContainer>
            <LinkContainer to={getLocalizedPath("alumni")}>
              <NavItem>{t("navigation.alumni")}</NavItem>
            </LinkContainer>
            <LinkContainer to={getLocalizedPath("talks")}>
              <NavItem>{t("navigation.talks")}</NavItem>
            </LinkContainer>
            <LinkContainer to={getLocalizedPath("schedule")}>
              <NavItem>{t("navigation.schedule")}</NavItem>
            </LinkContainer>
            {this.renderParticipants()}
            <LinkContainer to={getLocalizedPath("jury")}>
              <NavItem>{t("navigation.jury")}</NavItem>
            </LinkContainer>
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
              onClick={this.changeLanguage}
              title={t("language.nextName")}
            >
              {this.renderNextLanguage()}
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  },
});

export default withTranslation("common")(Header);
