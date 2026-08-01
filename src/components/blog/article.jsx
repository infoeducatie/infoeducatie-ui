"use strict";

import request from "@lib/request";
import { Col, Grid, Row } from "@ui/bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import "../../main.less";
import Header from "../header";
import RichTextContent from "../rich-text-content";

function formatDate(value, language) {
  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function BlogArticle(props) {
  const { slug } = useParams();
  const { t } = useTranslation("blog");
  const [result, setResult] = useState({
    post: null,
    hasErrored: false,
    language: null,
    slug: null,
  });
  const isLoading =
    result.language !== props.language || result.slug !== slug;
  const hasErrored = !isLoading && result.hasErrored;
  const post = isLoading ? null : result.post;

  useEffect(() => {
    let isCurrent = true;

    request({
      method: "GET",
      url: window.config.API_URL + `blog_posts/${slug}.json`,
      data: { locale: props.language },
      success(data) {
        if (!isCurrent) return;
        setResult({
          post: data && typeof data === "object" ? data : null,
          hasErrored: !data || typeof data !== "object",
          language: props.language,
          slug,
        });
      },
      error() {
        if (!isCurrent) return;
        setResult({ post: null, hasErrored: true, language: props.language, slug });
      },
    });

    return () => {
      isCurrent = false;
    };
  }, [props.language, slug]);

  return (
    <div className="blog-page blog-article-page">
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
            <Link className="blog-back-link" to="/blog">{t("back")}</Link>
            {isLoading ? <p role="status">{t("articleLoading")}</p> : null}
            {hasErrored ? (
              <p className="alert alert-warning" role="alert">
                {t("articleError")}
              </p>
            ) : null}
            {post ? (
              <article className="blog-article">
                {post.category ? (
                  <p className="blog-article__category">{post.category}</p>
                ) : null}
                <h2>{post.title}</h2>
                <p className="blog-article__meta">
                  {t("publishedBy", {
                    author: post.author_name,
                    date: formatDate(post.published_at, props.language),
                  })}
                </p>
                <RichTextContent html={post.body} />
              </article>
            ) : null}
            <Row className="small-spacing" />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
