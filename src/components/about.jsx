"use strict";

import { Col, Grid, Row } from "@ui/bootstrap";
import request from "@lib/request";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import "../main.less";
import DefaultDocument from "../../assets/img/icons/doc.png";
import Header from "./header";

function resolveAssetUrl(assetUrl) {
  if (!assetUrl) return null;

  try {
    return new URL(assetUrl, window.config.API_URL).toString();
  } catch {
    return assetUrl;
  }
}

function resolveRichTextAssetUrls(html) {
  if (!html || typeof DOMParser === "undefined") return html;

  const document = new DOMParser().parseFromString(html, "text/html");

  document.querySelectorAll("img[src]").forEach((image) => {
    const source = image.getAttribute("src");

    if (source?.startsWith("/uploads/")) {
      image.setAttribute("src", resolveAssetUrl(source));
    }
  });

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href?.startsWith("/uploads/")) {
      link.setAttribute("href", resolveAssetUrl(href));
    }
    if (/^https?:\/\//.test(href || "")) {
      link.setAttribute("rel", "noreferrer");
      link.setAttribute("target", "_blank");
    }
  });

  Array.from(document.body.children).forEach((element) => {
    if (element.tagName === "H1") {
      const heading = document.createElement("h2");
      heading.innerHTML = element.innerHTML;
      element.replaceWith(heading);
    } else if (
      element.tagName === "DIV" &&
      !element.querySelector("figure")
    ) {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = element.innerHTML;
      element.replaceWith(paragraph);
    }
  });

  return document.body.innerHTML;
}

export default function About(props) {
  const { t } = useTranslation("about");
  const [pageResult, setPageResult] = useState({
    page: null,
    hasErrored: false,
    language: null,
  });
  const [criteriaResult, setCriteriaResult] = useState({
    criteria: [],
    hasErrored: false,
    language: null,
  });
  const pageIsLoading = pageResult.language !== props.language;
  const pageHasErrored = !pageIsLoading && pageResult.hasErrored;
  const page = pageIsLoading ? null : pageResult.page;
  const pageBody = useMemo(
    () => resolveRichTextAssetUrls(page?.body),
    [page?.body],
  );
  const criteriaIsLoading = criteriaResult.language !== props.language;
  const criteriaHasErrored = !criteriaIsLoading && criteriaResult.hasErrored;
  const criteria = criteriaIsLoading ? [] : criteriaResult.criteria;

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
              <h1>{page?.title || t("title")}</h1>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid className="white-section">
        <Row>
          <Col md={10} mdOffset={1}>
            <Row className="small-spacing" />
            {pageIsLoading ? (
              <p className="page-status" role="status">{t("loading")}</p>
            ) : null}
            {pageHasErrored ? (
              <p className="page-status alert alert-warning" role="alert">
                {t("error")}
              </p>
            ) : null}
            {pageBody ? (
              <div
                className="about-rich-text"
                dangerouslySetInnerHTML={{ __html: pageBody }}
              />
            ) : null}
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
