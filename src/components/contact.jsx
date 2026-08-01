"use strict";

import { Col, Grid, Row } from "@ui/bootstrap";
import { useTranslation } from "react-i18next";

import "../main.less";
import Header from "./header";

const juryContacts = [
  ["educational", "educational@infoeducatie.ro"],
  ["multimedia", "multimedia@infoeducatie.ro"],
  ["utility", "utilitar@infoeducatie.ro"],
  ["robots", "roboti@infoeducatie.ro"],
  ["web", "web@infoeducatie.ro"],
];

export default function Contact(props) {
  const { t } = useTranslation("contact");

  return (
    <div className="contact">
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
            <div className="contact-details">
              <section
                aria-labelledby="contact-general"
                className="contact-group"
              >
                <h2 className="content-heading" id="contact-general">
                  {t("team")}
                </h2>
                <ul className="contact-list">
                  <li>
                    <span>{t("organization")}</span>
                    <a href="mailto:contact@infoeducatie.ro">
                      contact@infoeducatie.ro
                    </a>
                    <small>Emil Onea</small>
                  </li>
                  <li>
                    <span>{t("website")}</span>
                    <a href="mailto:ping@infoeducatie.ro">
                      ping@infoeducatie.ro
                    </a>
                  </li>
                </ul>
              </section>
              <section
                aria-labelledby="contact-jury"
                className="contact-group"
              >
                <h2 className="content-heading" id="contact-jury">
                  {t("jury")}
                </h2>
                <ul className="contact-list">
                  {juryContacts.map(([key, email]) => (
                    <li key={email}>
                      <span>{t(key)}</span>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
