"use strict";

import { Link } from "react-router-dom";

import { Col, Grid, Row } from "@ui/bootstrap";
import Header from "./header";

import "../main.less";

export default function NotFound(props) {
  return (
    <div className="not-found-page">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header
                changeLanguage={props.changeLanguage}
                current={props.current}
                isLoggedIn={props.isLoggedIn}
                language={props.language}
                logout={props.logout}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="not-found-code" aria-hidden="true">
                404
              </p>
              <h1>Pagina nu există</h1>
              <p className="not-found-lead">
                Linkul poate fi vechi sau adresa a fost introdusă greșit.
              </p>
            </Col>
          </Row>
        </Grid>
      </div>

      <Grid className="not-found-actions white-section">
        <Row>
          <Col md={8} mdOffset={2}>
            <h2 className="content-heading">Hai să revenim pe traseu</h2>
            <p>
              Poți continua de la pagina principală sau ne poți scrie dacă
              informația pe care o cauți ar trebui să fie aici.
            </p>
            <div className="not-found-links">
              <Link className="cta-link cta-primary" to="/">
                Pagina principală
              </Link>
              <Link className="cta-link cta-dark" to="/contacte">
                Contactează-ne
              </Link>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
