"use strict";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Grid, Row } from "@ui/bootstrap";
import request from "@lib/request";
import Header from "./header";
import RichTextContent from "./rich-text-content";

function resolveAssetUrl(assetUrl) {
  if (!assetUrl) return null;

  try {
    return new URL(assetUrl, window.config.API_URL).toString();
  } catch {
    return assetUrl;
  }
}

export default function SchedulePage(props) {
  const { t } = useTranslation("public");
  const [pageResult, setPageResult] = useState({
    page: null,
    hasErrored: false,
    language: null,
  });
  const isLoading = pageResult.language !== props.language;
  const hasErrored = !isLoading && pageResult.hasErrored;
  const page = isLoading ? null : pageResult.page;
  const documentUrl = resolveAssetUrl(page?.document_url);
  const editionName = props.edition.name ||
    props.edition.count ||
    props.edition.year;

  useEffect(() => {
    let isCurrent = true;

    request({
      method: "GET",
      url: window.config.API_URL + "content_pages/program.json",
      data: { locale: props.language },
      success(data) {
        if (!isCurrent) return;
        setPageResult({
          page: data && typeof data === "object" ? data : null,
          hasErrored: !data || typeof data !== "object",
          language: props.language,
        });
      },
      error() {
        if (!isCurrent) return;
        setPageResult({
          page: null,
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
    <div className="schedule">
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
              <h1>{page?.title || t("schedule.title")}</h1>
              <h2>{t("edition.label", { edition: editionName })}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid className="white-section">
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            {isLoading ? (
              <p className="page-status" role="status">{t("schedule.loading")}</p>
            ) : null}
            {hasErrored ? (
              <p className="page-status alert alert-warning" role="alert">
                {t("schedule.error")}
              </p>
            ) : null}
            <RichTextContent html={page?.body} />
            {documentUrl ? (
              <div className="schedule-preview">
                <div className="schedule-heading">
                  <h2 className="content-heading">{t("schedule.documentHeading")}</h2>
                  <a
                    className="schedule-external"
                    href={documentUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("schedule.open")} <ExternalLink aria-hidden="true" size={18} />
                  </a>
                </div>
                <p className="schedule-preview-note">{t("schedule.previewNote")}</p>
                <iframe
                  className="schedule-document"
                  title={t("schedule.documentTitle")}
                  loading="lazy"
                  src={`${documentUrl}#view=FitH`}
                />
              </div>
            ) : null}
            {!isLoading && !hasErrored && !documentUrl ? (
              <p className="page-status" role="status">{t("schedule.empty")}</p>
            ) : null}
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
