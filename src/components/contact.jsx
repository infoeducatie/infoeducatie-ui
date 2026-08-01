"use strict";

import { Col, Grid, Row } from "@ui/bootstrap";
import request from "@lib/request";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "../main.less";
import RichTextContent from "./rich-text-content";
import SecondaryHero from "./secondary-hero";

export default function Contact(props) {
  const { t } = useTranslation("contact");
  const [pageResult, setPageResult] = useState({
    page: null,
    hasErrored: false,
    language: null,
  });
  const isLoading = pageResult.language !== props.language;
  const hasErrored = !isLoading && pageResult.hasErrored;
  const page = isLoading ? null : pageResult.page;

  useEffect(() => {
    let isCurrent = true;

    request({
      method: "GET",
      url: window.config.API_URL + "content_pages/contact.json",
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
    <div className="contact">
      <SecondaryHero headerProps={props}>
        <h1>{page?.title || t("title")}</h1>
      </SecondaryHero>
      <Grid className="white-section">
        <Row>
          <Col md={10} mdOffset={1}>
            <Row className="small-spacing" />
            {isLoading ? (
              <p className="page-status" role="status">{t("loading")}</p>
            ) : null}
            {hasErrored ? (
              <p className="page-status alert alert-warning" role="alert">
                {t("error")}
              </p>
            ) : null}
            <RichTextContent html={page?.body} />
            <Row className="small-spacing" />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
