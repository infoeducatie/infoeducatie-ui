"use strict";

import { getLocalizedPath } from "@lib/localized-routes";
import { Col, Grid, Row } from "@ui/bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../main.less";
import Bitdefender from "../../assets/img/sponsors/bitdefender.jpg";
import Cisco from "../../assets/img/sponsors/cisco.png";
import CJVrancea from "../../assets/img/sponsors/logoCJVrancea.jpg";
import cyberedu from "../../assets/img/sponsors/cyberedu.png";
import EasyHost from "../../assets/img/sponsors/easyhost.png";
import Electric from "../../assets/img/sponsors/electric.png";
import InfoBits from "../../assets/img/sponsors/link_infobits_academy.jpg";
import Intuitext from "../../assets/img/sponsors/intuitext.gif";
import leonte from "../../assets/img/sponsors/leonte.png";
import MEN from "../../assets/img/sponsors/edu.jpg";
import Micromet from "../../assets/img/sponsors/micromet.jpg";
import Orange from "../../assets/img/sponsors/orange.png";
import PajisteSmall from "../../assets/img/pajiste-720.webp";
import PajisteMedium from "../../assets/img/pajiste-960.webp";
import Pajiste from "../../assets/img/pajiste.webp";
import sindicatVrancea from "../../assets/img/sponsors/SindicatVrancea.jpg";
import UPB from "../../assets/img/sponsors/upb-ro.png";
import Upir from "../../assets/img/sponsors/upir.png";
import UVT from "../../assets/img/sponsors/uvt.png";
import VivaCredit from "../../assets/img/sponsors/vivacredit.png";
import CommunityInvite from "./community-invite";
import Header from "./header";
import NewsContainer from "./news/news-container";

const educationalPartners = [
  {
    altKey: "educationMinistry",
    height: 78,
    href: "https://www.edu.ro/",
    image: MEN,
    width: 156,
  },
  {
    altKey: "teachersUnion",
    height: 70,
    href: "https://upir.ro/",
    image: Upir,
    width: 180,
  },
  {
    altKey: "countyCouncil",
    height: 100,
    href: "https://cjvrancea.ro/",
    image: CJVrancea,
    width: 205,
  },
  {
    altKey: "politehnica",
    height: 117,
    href: "https://upb.ro/",
    image: UPB,
    width: 280,
  },
  {
    altKey: "westUniversity",
    height: 62,
    href: "https://uvt.ro/",
    image: UVT,
    width: 300,
  },
];

const goldSponsors = [
  ["Viva Credit", "https://vivacredit.ro/", VivaCredit, 217],
  ["Bitdefender", "https://bitdefender.com", Bitdefender, 185],
  ["Orange", "https://orange.ro", Orange, 100],
  ["Cisco", "https://cisco.com/", Cisco, 183],
  ["Intuitext", "https://www.intuitext.ro/", Intuitext, 326],
];

const silverSponsors = [
  ["Leonte", "https://leonte.ro/", leonte, 120, 93],
  ["Easyhost", "https://ro.easyhost.com/", EasyHost, 150],
  ["InfoBits Academy", "https://ebooks.infobits.ro", InfoBits, 222],
  ["educationUnion", "https://slivrancea.blogspot.com/", sindicatVrancea, 117],
  ["CyberEDU", "https://www.cyber-edu.co/", cyberedu, 100],
  ["Micromet", "https://www.micromet.ro/", Micromet, 533],
  ["Electric SRL", "https://www.electricsrl.ro/", Electric, 290],
];

function formatCampDate(edition, language, t) {
  if (!edition.camp_start_date || !edition.camp_end_date) {
    return t("camp.datePending");
  }

  const start = new Date(edition.camp_start_date);
  const end = new Date(edition.camp_end_date);
  const locale = language === "en" ? "en-GB" : "ro-RO";
  const month = new Intl.DateTimeFormat(locale, { month: "long" });

  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${month.format(end)} ${end.getFullYear()}`;
  }

  return (
    `${start.getDate()} ${month.format(start)} – ` +
    `${end.getDate()} ${month.format(end)} ${end.getFullYear()}`
  );
}

function SponsorLogo({ alt, height = 100, href, image, width }) {
  return (
    <a href={href} rel="noreferrer" target="_blank">
      <img
        alt={alt}
        decoding="async"
        height={height}
        loading="lazy"
        src={image}
        width={width}
      />
    </a>
  );
}

export default function Home(props) {
  const { t } = useTranslation("home");
  const { current, language } = props;

  return (
    <div className={`home ${language === "en" ? "english" : ""}`}>
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header {...props} />
          <Row>
            <Col xs={12}>
              <h1>{t("hero.title")}</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>{t("hero.subtitle")}</h2>
              <p className="tagline">
                {t("hero.edition", { count: current.edition.count })}
              </p>
            </Col>
          </Row>
          <Row className="small-spacing" />
          <Row className="hero-actions">
            <Col md={4} mdOffset={2}>
              <p className="left-button">
                <Link
                  className="cta-link cta-primary"
                  to={getLocalizedPath("register")}
                >
                  {t("hero.register")}
                </Link>
              </p>
            </Col>
            <Col md={4}>
              <p className="right-button">
                <Link
                  className="cta-link cta-light"
                  to={getLocalizedPath("about")}
                >
                  {t("hero.about")}
                </Link>
              </p>
            </Col>
          </Row>
        </Grid>
      </div>

      <CommunityInvite />

      <div className="green-section-wrapper">
        <NewsContainer />
      </div>

      <div className="gray-section-wrapper">
        <Grid className="gray-section">
          <Row className="small-spacing" />
          <Row>
            <Col md={6} mdOffset={6}>
              <h2 className="section-heading">{t("alumnus.eyebrow")}</h2>
              <Row className="small-spacing" />
              <p className="quote">{t("alumnus.quote")}</p>
              <Row className="small-spacing" />
              <h3 className="alumnus-name">{t("alumnus.name")}</h3>
              <p className="alumnus-position">{t("alumnus.role")}</p>
            </Col>
          </Row>
          <Row className="small-spacing" />
        </Grid>
      </div>

      <div className="yellow-section-wrapper">
        <div className="yellow-section container-fluid">
          <Row>
            <Col className="text middle-align" md={4} mdOffset={2}>
              <div className="wrapper-for-flexbox">
                <h2 className="location-title">{t("camp.location")}</h2>
                <p className="data">
                  <span className="pink-dash" />
                  {formatCampDate(current.edition, language, t)}
                  <span className="pink-dash" />
                </p>
                <p className="edition">
                  {t("camp.edition", { count: current.edition.count })}
                </p>
                <Row className="small-spacing" />
                <p>
                  <Link
                    className="cta-link cta-dark"
                    to={getLocalizedPath("photos")}
                  >
                    {t("camp.photos")}
                  </Link>
                </p>
              </div>
            </Col>
            <Col className="grass" md={6}>
              <img
                alt={t("camp.imageAlt")}
                decoding="async"
                height="998"
                loading="lazy"
                sizes="(min-width: 992px) 50vw, 100vw"
                src={Pajiste}
                srcSet={`${PajisteSmall} 720w, ${PajisteMedium} 960w, ${Pajiste} 1440w`}
                width="1440"
              />
            </Col>
          </Row>
        </div>
      </div>

      <div className="sponsors-section-wrapper">
        <Grid className="sponsors-section">
          <Row className="small-spacing" />
          <Row>
            <Col xs={12}>
              <h2>{t("sponsors.partners")}</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="logos">
                {educationalPartners.map((partner) => (
                  <SponsorLogo
                    {...partner}
                    alt={t(`sponsors.${partner.altKey}`)}
                    key={partner.href}
                  />
                ))}
              </div>
            </Col>
          </Row>
          <Row className="small-spacing" />
          <Row>
            <Col xs={12}>
              <h3>{t("sponsors.gold")}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="logos">
                {goldSponsors.map(([alt, href, image, width]) => (
                  <SponsorLogo
                    alt={alt}
                    href={href}
                    image={image}
                    key={href}
                    width={width}
                  />
                ))}
              </div>
            </Col>
          </Row>
          <Row className="small-spacing" />
          <Row>
            <Col xs={12}>
              <h3>{t("sponsors.silver")}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="logos">
                {silverSponsors.map(([alt, href, image, width, height]) => (
                  <SponsorLogo
                    alt={alt === "educationUnion" ? t(`sponsors.${alt}`) : alt}
                    height={height}
                    href={href}
                    image={image}
                    key={href}
                    width={width}
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
