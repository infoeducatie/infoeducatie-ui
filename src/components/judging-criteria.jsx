"use strict";

import request from "@lib/request";
import { Col, Grid, Row } from "@ui/bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import DefaultDocument from "../../assets/img/icons/doc.png";

function resolveAssetUrl(assetUrl) {
  if (!assetUrl) return null;

  try {
    return new URL(assetUrl, window.config.API_URL).toString();
  } catch {
    return assetUrl;
  }
}

export default function JudgingCriteria({ language }) {
  const { t } = useTranslation("public");
  const [result, setResult] = useState({
    criteria: [],
    hasErrored: false,
    language: null,
  });
  const isLoading = result.language !== language;

  useEffect(() => {
    let isCurrent = true;

    request({
      method: "GET",
      url: window.config.API_URL + "judging_criteria.json",
      data: { locale: language },
      success(data) {
        if (!isCurrent) return;

        if (!Array.isArray(data)) {
          setResult({ criteria: [], hasErrored: true, language });
          return;
        }

        setResult({
          criteria: data.map((criterion) => ({
            ...criterion,
            document_url: resolveAssetUrl(criterion.document_url),
          })),
          hasErrored: false,
          language,
        });
      },
      error() {
        if (isCurrent) {
          setResult({ criteria: [], hasErrored: true, language });
        }
      },
    });

    return () => {
      isCurrent = false;
    };
  }, [language]);

  function renderStatus() {
    if (isLoading) {
      return <p className="page-status" role="status">
        {t("jury.criteriaLoading")}
      </p>;
    }

    if (result.hasErrored) {
      return <p className="page-status alert alert-warning" role="alert">
        {t("jury.criteriaError")}
      </p>;
    }

    if (!result.criteria.length) {
      return <p className="page-status" role="status">
        {t("jury.criteriaEmpty")}
      </p>;
    }

    return null;
  }

  return <div className="judging-criteria-section-wrapper">
    <Grid className="judging-criteria-section">
      <Row>
        <Col className="block">
          <h2 className="judging-criteria-heading">
            <span className="pink-dash" />
            {t("jury.criteria")}
            <span className="pink-dash" />
          </h2>
          <div className="judging-criteria-documents">
            {renderStatus()}
            {!isLoading && !result.hasErrored && result.criteria.map((criterion) => (
              <a
                aria-label={t("jury.openCriteria", {
                  category: criterion.title,
                })}
                className="judging-criterion"
                href={criterion.document_url}
                key={criterion.id}
                rel="noreferrer"
                target="_blank"
              >
                <span className="judging-criterion-title">{criterion.title}</span>
                <img alt="" height="35" src={DefaultDocument} width="50" />
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </Grid>
  </div>;
}
