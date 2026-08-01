"use strict";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getLocalizedPath } from "@lib/localized-routes";
import { Col, Grid, Row } from "@ui/bootstrap";
import Header from "./header";

import "../main.less";

export default function NotFound(props) {
  const { t } = useTranslation("notFound");
  return (
    <div className="not-found-page">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header
                changeLanguage={props.changeLanguage}
                current={props.current}
                isLoggedIn={props.isLoggedIn}
                language={props.language}
                logout={props.logout}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="not-found-code" aria-hidden="true">
                404
              </p>
              <h1>{t("title")}</h1>
              <p className="not-found-lead">
                {t("lead")}
              </p>
            </Col>
          </Row>
        </Grid>
      </div>

      <Grid className="not-found-actions white-section">
        <Row>
          <Col md={8} mdOffset={2}>
            <h2 className="content-heading">{t("recoveryTitle")}</h2>
            <p>{t("recoveryText")}</p>
            <div className="not-found-links">
              <Link
                className="cta-link cta-primary"
                to={getLocalizedPath("home")}
              >
                {t("home")}
              </Link>
              <Link
                className="cta-link cta-dark"
                to={getLocalizedPath("contact")}
              >
                {t("contact")}
              </Link>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
