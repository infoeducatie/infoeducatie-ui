"use strict";

import request from "@lib/request";
import { Col, Grid, Row } from "@ui/bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "../../main.less";
import Header from "../header";

function formatDate(value, language) {
  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function Blog(props) {
  const { t } = useTranslation("blog");
  const [result, setResult] = useState({
    posts: [],
    hasErrored: false,
    language: null,
  });
  const isLoading = result.language !== props.language;
  const hasErrored = !isLoading && result.hasErrored;
  const posts = isLoading ? [] : result.posts;

  useEffect(() => {
    let isCurrent = true;

    request({
      method: "GET",
      url: window.config.API_URL + "blog_posts.json",
      data: { locale: props.language },
      success(data) {
        if (!isCurrent) return;
        setResult({
          posts: Array.isArray(data) ? data : [],
          hasErrored: !Array.isArray(data),
          language: props.language,
        });
      },
      error() {
        if (!isCurrent) return;
        setResult({ posts: [], hasErrored: true, language: props.language });
      },
    });

    return () => {
      isCurrent = false;
    };
  }, [props.language]);

  return (
    <div className="blog-page">
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
              <h2>{t("subtitle")}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid className="white-section blog-list">
        <Row>
          <Col md={10} mdOffset={1}>
            <Row className="small-spacing" />
            {isLoading ? <p role="status">{t("loading")}</p> : null}
            {hasErrored ? (
              <p className="alert alert-warning" role="alert">{t("error")}</p>
            ) : null}
            {!isLoading && !hasErrored && !posts.length ? (
              <p role="status">{t("empty")}</p>
            ) : null}
            {posts.map((post) => (
              <article className="blog-card" key={post.id}>
                <div className="blog-card__meta">
                  {post.category ? <span>{post.category}</span> : null}
                  <time dateTime={post.published_at}>
                    {formatDate(post.published_at, props.language)}
                  </time>
                </div>
                <h2>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <p className="blog-card__author">
                  {t("by", { author: post.author_name })}
                </p>
                <Link className="blog-card__link" to={`/blog/${post.slug}`}>
                  {t("readMore")}
                </Link>
              </article>
            ))}
            <Row className="small-spacing" />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
