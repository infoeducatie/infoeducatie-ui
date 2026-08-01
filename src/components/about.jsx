"use strict";

import { Col, Grid, Row } from "@ui/bootstrap";
import request from "@lib/request";
import { useEffect, useState } from "react";
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

function resolveAssetUrl(assetUrl) {
  if (!assetUrl) return null;

  try {
    return new URL(assetUrl, window.config.API_URL).toString();
  } catch {
    return assetUrl;
  }
}

export default function About(props) {
  const { t } = useTranslation("about");
  const [criteriaResult, setCriteriaResult] = useState({
    criteria: [],
    hasErrored: false,
    language: null,
  });
  const criteriaIsLoading = criteriaResult.language !== props.language;
  const criteriaHasErrored = !criteriaIsLoading && criteriaResult.hasErrored;
  const criteria = criteriaIsLoading ? [] : criteriaResult.criteria;

  useEffect(() => {
    let isCurrent = true;

    request({
      method: "GET",
      url: window.config.API_URL + "judging_criteria.json",
      data: { locale: props.language },
      success(data) {
        if (!isCurrent) return;
        if (!Array.isArray(data)) {
          setCriteriaResult({
            criteria: [],
            hasErrored: true,
            language: props.language,
          });
          return;
        }

        setCriteriaResult({
          criteria: data.map((criterion) => ({
            ...criterion,
            document_url: resolveAssetUrl(criterion.document_url),
          })),
          hasErrored: false,
          language: props.language,
        });
      },
      error() {
        if (!isCurrent) return;
        setCriteriaResult({
          criteria: [],
          hasErrored: true,
          language: props.language,
        });
      },
    });

    return () => {
      isCurrent = false;
    };
  }, [props.language]);

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
                    href="https://data.infoeducatie.ro/manual/regulament.pdf"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t("documents.rulesLink")}
                  </a>
                  , {t("documents.proceduresPrefix")}{" "}
                  <a
                    href="https://data.infoeducatie.ro/manual/proceduri-de-aplicare-regulament.pdf"
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
                {criteriaIsLoading ? (
                  <p className="page-status" role="status">
                    {t("documents.criteriaLoading")}
                  </p>
                ) : null}
                {criteriaHasErrored ? (
                  <p className="page-status alert alert-warning" role="alert">
                    {t("documents.criteriaError")}
                  </p>
                ) : null}
                {!criteriaIsLoading && !criteriaHasErrored && !criteria.length ? (
                  <p className="page-status" role="status">
                    {t("documents.criteriaEmpty")}
                  </p>
                ) : null}
                {criteria.map((criterion) => (
                  <div className="jury-criteria" key={criterion.id}>
                    <div className="jury-criteria-txt">{criterion.title}</div>
                    <div className="jury-criteria-img">
                      <a
                        aria-label={t("documents.openCriteria", {
                          category: criterion.title,
                        })}
                        href={criterion.document_url}
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
                ))}
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}
