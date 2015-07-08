"use strict";

import React from "react";

import { Row, Col, Grid } from "react-bootstrap";
import Header from "./header";

import "../main.less";
import DefaultDocument from "../../assets/img/icons/doc.png";


export default React.createClass({
  displayName: "GalaciucPage",

  render() {
    var criteria = [
      {"name": "Educațional", "link": "http://data.infoeducatie.ro/manual/educational.pdf"},
      {"name": "Multimedia", "link": "http://data.infoeducatie.ro/manual/multimedia.pdf"},
      {"name": "Roboți", "link": "http://data.infoeducatie.ro/manual/roboti.pdf"},
      {"name": "Utilitar", "link": "http://data.infoeducatie.ro/manual/utilitar.pdf"},
      {"name": "Web", "link": "http://data.infoeducatie.ro/manual/web.pdf"}
    ];

    return <div className="galaciuc">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Row className="small-spacing" />
            <Col xs={12}>
              <h1>Despre InfoEducație</h1>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid className="white-section">
        <Row>
          <Col mdOffset={1} md={10}>
            <Row className="small-spacing" />
            <p>
              Organizat din 1993, este dedicat elevilor cu aptitudini,
              înclinații și interes pentru crearea aplicațiilor
              informatice, atât de la profilul informatică cât
              și de la alte profile. Concursul se desfășoară în
              patru etape: pe unitatea școlară, locală, județeană
              și națională. Etapa națională se desfășoară în
              tabăra Galaciuc, județul Vrancea.
            </p>
            <Row className="small-spacing" />
            <Row>
              <Col xs={12}>
                <div className="category yellow">
                  <div className="round-icon">
                    <span className="section-icon web" />
                  </div>
                  <div className="description">web</div>
                </div>

                <div className="category blue">
                  <div className="round-icon">
                    <span className="section-icon roboti" />
                  </div>
                  <div className="description">roboți</div>
                </div>

                <div className="category green">
                  <div className="round-icon">
                    <span className="section-icon multimedia" />
                  </div>
                  <div className="description">multimedia</div>
                </div>

                <div className="category pink">
                  <div className="round-icon">
                    <span className="section-icon educational" />
                  </div>
                  <div className="description">educațional</div>
                </div>

                <div className="category black">
                  <div className="round-icon">
                    <span className="section-icon utilitar" />
                  </div>
                  <div className="description">utilitar</div>
                </div>
              </Col>
            </Row>
            <Row className="small-spacing" />
            <Row>
              <Col xs={12}>
                <h4>Participare la concurs</h4>
                <p>
                    La fiecare etapă vor fi prezentate lucrări
                    realizate de către elevi, indiferent de anul de
                    studiu (clasele IX - XII). Participarea la etapele
                    ulterioare este hotărâtă de clasamentele etapelor
                    anterioare.
                </p>
                <p>
                    În etapa finală există și un concurs <em>open</em>
                    , pe echipe, pe parcursul a 24 de ore. Concursul
                    constă în realizarea unei lucrări pe o
                    temă dată. Lucrarea va îmbina elemente de <em>
                    proiectare, programare și design</em>.
                </p>
                <p>
                    Pe întreaga durată
                    a taberei se vor organiza și sesiuni de comunicare
                    pe teme de inginerie software.
                </p>
                <p>
                    Toate mijloacele IT sunt oferite de Colegiul
                    Național Unirea, comunitatea Tulnici și Liceul Vidra.
                </p>
                <Row className="small-spacing" />
                <h4>Condiții de participare</h4>
                <p>
                    Fiecare județ doritor poate participa cu maximum
                    <em>5 elevi</em> și un <em>profesor însoțitor</em>
                    , în următoarele condiții:
                </p>
                <ul>
                  <li>
                    minim trei lucrări (web, roboți sau IoT, multimedia,
                    software educțional, software utilitar)
                  </li>
                  <li>
                    cerinte hardware și software rezonabile
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <p>
                    Regulamentul concursului poate fi accesat&nbsp;
                    <a href="http://data.infoeducatie.ro/manual/regulament.pdf" target="_blank">aici</a>
                    , iar criteriile de aplicare a regulamentului sunt disponibile&nbsp;
                    <a href="http://data.infoeducatie.ro/manual/proceduri-de-aplicare-regulament.pdf" target="_blank">aici</a>.
                </p>
              </Col>
            </Row>
            <Row className="small-spacing" />
          </Col>
        </Row>
      </Grid>
      <div className="orange-section-wrapper">
        <Grid className="orange-section">
          <Row>
            <Col className="block">
              <Row className="jury-criteria-desc">
                  <span className="pink-dash" />
                    criterii de jurizare
                  <span className="pink-dash" />
              </Row>
              <Row className="jury-criteria-documents">
                {criteria.map(function(doc) {
                  return <div className="jury-criteria">
                    <div className="jury-criteria-txt">{doc.name}</div>
                    <div className="jury-criteria-img"><a href={doc.link} target="_blank"><img src={DefaultDocument} alt={doc.link} /></a></div>
                  </div>;
                })}
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>;
  }
});
