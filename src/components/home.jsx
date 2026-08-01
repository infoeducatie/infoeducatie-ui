"use strict";

import { getLocalizedPath } from "@lib/localized-routes";
import { Col, Grid, Row } from "@ui/bootstrap";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../main.less";
import HomeCamp from "../../assets/img/home-camp-2026.jpg";
import CommunityInvite from "./community-invite";
import Header from "./header";
import JudgingCriteria from "./judging-criteria";
import NewsContainer from "./news/news-container";
import SponsorsSection from "./sponsors-section";

function formatCampDate(edition, language, t) {
  if (!edition.camp_start_date || !edition.camp_end_date) {
    return t("camp.datePending");
  }

  const start = new Date(edition.camp_start_date);
  const end = new Date(edition.camp_end_date);
  const locale = language === "en" ? "en-GB" : "ro-RO";
  const month = new Intl.DateTimeFormat(locale, { month: "long" });

  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${month.format(end)} ${end.getFullYear()}`;
  }

  return (
    `${start.getDate()} ${month.format(start)} – ` +
    `${end.getDate()} ${month.format(end)} ${end.getFullYear()}`
  );
}

export default function Home(props) {
  const { t } = useTranslation("home");
  const { current, language } = props;

  return (
    <div className={`home ${language === "en" ? "english" : ""}`}>
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header {...props} />
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="hero-eyebrow">{t("hero.subtitle")}</p>
              <h1>{t("hero.statement")}</h1>
              <p className="hero-description">{t("hero.description")}</p>
              <p className="tagline">
                {t("hero.title")} · {t("hero.edition", { count: current.edition.count })}
              </p>
              <div className="hero-actions">
                <Link
                  className="cta-link cta-primary"
                  to={getLocalizedPath("register")}
                >
                  <span>{t("hero.register")}</span>
                  <ArrowRight aria-hidden="true" size={19} />
                </Link>
                <Link
                  className="cta-link cta-light"
                  to={getLocalizedPath("about")}
                >
                  <span>{t("hero.about")}</span>
                  <ArrowDown aria-hidden="true" size={19} />
                </Link>
              </div>
            </div>
          </div>
        </Grid>
      </div>

      <div className="green-section-wrapper">
        <NewsContainer language={language} />
      </div>

      <JudgingCriteria language={language} />

      <div className="gray-section-wrapper">
        <Grid className="gray-section">
          <Row className="small-spacing" />
          <Row>
            <Col md={6} mdOffset={6}>
              <h2 className="section-heading">{t("alumnus.eyebrow")}</h2>
              <Row className="small-spacing" />
              <p className="quote">{t("alumnus.quote")}</p>
              <Row className="small-spacing" />
              <h3 className="alumnus-name">{t("alumnus.name")}</h3>
              <p className="alumnus-position">{t("alumnus.role")}</p>
            </Col>
          </Row>
          <Row className="small-spacing" />
        </Grid>
      </div>

      <div className="yellow-section-wrapper">
        <div className="yellow-section container-fluid">
          <Row>
            <Col className="text middle-align" md={4} mdOffset={2}>
              <div className="wrapper-for-flexbox">
                <h2 className="location-title">{t("camp.location")}</h2>
                <p className="data">
                  <span className="pink-dash" />
                  {formatCampDate(current.edition, language, t)}
                  <span className="pink-dash" />
                </p>
                <p className="edition">
                  {t("camp.edition", { count: current.edition.count })}
                </p>
                <Row className="small-spacing" />
                <p>
                  <Link
                    className="cta-link cta-dark"
                    to={getLocalizedPath("photos")}
                  >
                    {t("camp.photos")}
                  </Link>
                </p>
              </div>
            </Col>
            <Col className="grass" md={6}>
              <img
                alt={t("camp.imageAlt")}
                decoding="async"
                height="1155"
                loading="lazy"
                src={HomeCamp}
                width="1732"
              />
            </Col>
          </Row>
        </div>
      </div>

      <SponsorsSection language={language} />

      <CommunityInvite />
    </div>
  );
}
