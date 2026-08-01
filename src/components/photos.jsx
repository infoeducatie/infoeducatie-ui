"use strict";

import request from "@lib/request";
import { Col, Grid, Row } from "@ui/bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "../main.less";
import PhotoWrapper from "./photo-wrapper.jsx";
import SecondaryHero from "./secondary-hero";

function resolveAssetUrl(assetUrl) {
  if (!assetUrl) return null;

  try {
    return new URL(assetUrl, window.config.API_URL).toString();
  } catch {
    return assetUrl;
  }
}

export default function Photos(props) {
  const { t } = useTranslation("photos");
  const [albums, setAlbums] = useState([]);
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    request({
      method: "GET",
      url: window.config.API_URL + "photo_albums.json",
      success(data) {
        if (!isCurrent) return;
        if (!Array.isArray(data)) {
          setHasErrored(true);
          setIsLoading(false);
          return;
        }

        setAlbums(data.map((album) => ({
          ...album,
          cover_image_url: resolveAssetUrl(album.cover_image_url),
        })));
        setHasErrored(false);
        setIsLoading(false);
      },
      error() {
        if (!isCurrent) return;
        setHasErrored(true);
        setIsLoading(false);
      },
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div className="photos">
      <SecondaryHero headerProps={props} tone="gray">
        <h1>{t("title")}</h1>
        <h2>{t("subtitle")}</h2>
      </SecondaryHero>
      <div className="white-section-wrapper">
        <Grid className="white-section">
          <Row className="small-spacing" />
          <Row>
            <Col md={10} mdOffset={1}>
              <div className="photo-albums">
                {isLoading ? (
                  <p className="page-status" role="status">{t("loading")}</p>
                ) : null}
                {hasErrored ? (
                  <p className="page-status alert alert-warning" role="alert">
                    {t("error")}
                  </p>
                ) : null}
                {!isLoading && !hasErrored && !albums.length ? (
                  <p className="page-status" role="status">{t("empty")}</p>
                ) : null}
                {albums.map((album) => (
                  <PhotoWrapper
                    ariaLabel={t("albumLabel", { title: album.title })}
                    coverImageUrl={album.cover_image_url}
                    key={album.id}
                    link={album.external_url}
                    text={t("moreDetails")}
                    title={album.title}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}
