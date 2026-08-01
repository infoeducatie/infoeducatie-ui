"use strict";

import { Col, Grid, Row } from "@ui/bootstrap";
import { useTranslation } from "react-i18next";

import "../main.less";
import DefaultDocument from "../../assets/img/icons/doc.png";
import Header from "./header";

const categories = [
  ["web", "yellow"],
  ["robots", "blue", "roboti"],
  ["multimedia", "green"],
  ["educational", "pink"],
  ["utility", "black", "utilitar"],
];

const criteria = [
  ["educational", "http://data.infoeducatie.ro/manual/educational.pdf"],
  ["multimedia", "http://data.infoeducatie.ro/manual/multimedia.pdf"],
  ["robots", "http://data.infoeducatie.ro/manual/roboti.pdf"],
  ["utility", "http://data.infoeducatie.ro/manual/utilitar.pdf"],
  ["web", "http://data.infoeducatie.ro/manual/web.pdf"],
];

export default function About(props) {
  const { t } = useTranslation("about");

  return (
    <div className="galaciuc">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header {...props} />
            </Col>
          </Row>
          <Row>
            <Row className="small-spacing" />
            <Col xs={12}>
              <h1>{t("title")}</h1>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid className="white-section">
        <Row>
          <Col md={10} mdOffset={1}>
            <Row className="small-spacing" />
            <p>{t("intro")}</p>
            <Row className="small-spacing" />
            <Row>
              <Col xs={12}>
                {categories.map(([key, color, icon = key]) => (
                  <div className={`category ${color}`} key={key}>
                    <div className="round-icon">
                      <span className={`section-icon ${icon}`} />
                    </div>
                    <div className="description">{t(`categories.${key}`)}</div>
                  </div>
                ))}
              </Col>
            </Row>
            <Row className="small-spacing" />
            <Row>
              <Col xs={12}>
                <h2 className="content-heading">{t("participation.title")}</h2>
                <p>{t("participation.projects")}</p>
                <p>{t("participation.open")}</p>
                <p>{t("participation.talks")}</p>
                <Row className="small-spacing" />
                <h2 className="content-heading">{t("requirements.title")}</h2>
                <p>{t("requirements.intro")}</p>
                <ul>
                  <li>{t("requirements.projects")}</li>
                  <li>{t("requirements.resources")}</li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <p>
                  {t("documents.rulesPrefix")}{" "}
                  <a
                    href="http://data.infoeducatie.ro/manual/regulament.pdf"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t("documents.rulesLink")}
                  </a>
                  , {t("documents.proceduresPrefix")}{" "}
                  <a
                    href="http://data.infoeducatie.ro/manual/proceduri-de-aplicare-regulament.pdf"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t("documents.rulesLink")}
                  </a>
                  .
                </p>
              </Col>
            </Row>
            <Row className="small-spacing" />
          </Col>
        </Row>
      </Grid>
      <div className="orange-section-wrapper">
        <Grid className="orange-section">
          <Row>
            <Col className="block">
              <div className="jury-criteria-desc">
                <span className="pink-dash" />
                {t("documents.criteria")}
                <span className="pink-dash" />
              </div>
              <Row className="jury-criteria-documents">
                {criteria.map(([key, link]) => {
                  const category = t(`categories.${key}`);
                  return (
                    <div className="jury-criteria" key={link}>
                      <div className="jury-criteria-txt">{category}</div>
                      <div className="jury-criteria-img">
                        <a
                          aria-label={t("documents.openCriteria", { category })}
                          href={link}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <img
                            alt=""
                            height="35"
                            src={DefaultDocument}
                            width="50"
                          />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}
