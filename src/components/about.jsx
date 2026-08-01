"use strict";

import { Col, Grid, Row } from "@ui/bootstrap";
import request from "@lib/request";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "../main.less";
import JudgingCriteria from "./judging-criteria";
import RichTextContent from "./rich-text-content";
import SecondaryHero from "./secondary-hero";

export default function About(props) {
  const { t } = useTranslation("about");
  const [pageResult, setPageResult] = useState({
    page: null,
    hasErrored: false,
    language: null,
  });
  const pageIsLoading = pageResult.language !== props.language;
  const pageHasErrored = !pageIsLoading && pageResult.hasErrored;
  const page = pageIsLoading ? null : pageResult.page;

  useEffect(() => {
    let isCurrent = true;

    request({
      method: "GET",
      url: window.config.API_URL + "content_pages/about.json",
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
    <div className="galaciuc">
      <SecondaryHero headerProps={props}>
        <h1>{page?.title || t("title")}</h1>
      </SecondaryHero>
      <Grid className="white-section">
        <Row>
          <Col md={10} mdOffset={1}>
            {pageIsLoading ? (
              <p className="page-status" role="status">{t("loading")}</p>
            ) : null}
            {pageHasErrored ? (
              <p className="page-status alert alert-warning" role="alert">
                {t("error")}
              </p>
            ) : null}
            <RichTextContent html={page?.body} />
          </Col>
        </Row>
      </Grid>
      <JudgingCriteria language={props.language} />
    </div>
  );
}
