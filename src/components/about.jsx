"use strict";

import React from "react";

import { Row, Col, Grid } from "react-bootstrap";
import Header from "./header";

import "./about.less"
import DefaultDocument from "../../assets/img/icons/doc.png";


export default React.createClass({
  displayName: "GalaciucPage",

  render() {
    var criteria = [
      {"name": "Educațional", "link": "https://docs.google.com/document/d/10ygW8gpijQJE94CbMMNxhrt_ju3X-tMjPATf7WcjTW8/pub"},
      {"name": "Multimedia", "link": "https://docs.google.com/document/d/12UY9ByKQt7CpBj11vwg1HPrsKOH-uTL9kFCEdxBgvAY/pub"},
      {"name": "Mobile", "link": "https://docs.google.com/document/d/1jqwoAduZoHjnj01Q6eQE0DWNB-DeMQouLumkW753mUA/pub"},
      {"name": "Roboți", "link": "https://docs.google.com/document/d/1n0yoqA3n9heBiYWgmeg-lfXYPvSMVMRhGZrHRYKhDVk/pub"},
      {"name": "Utilitar", "link": "https://docs.google.com/document/d/19HTucZgQWY92nZ-NDoKRWlE63hipb_IkZVcMxHyOCdc/pub"},
      {"name": "Web", "link": "https://docs.google.com/document/d/1ZgdZz_5JHJSZyxWnZWzP162NZ2H3CkBojyp5p6cKNDI/pub"}
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
            <Col xs={12}>
              <h1>Despre Concursul InfoEducație</h1>
              <h2>istoric și regulament</h2>
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
            <Row className="big-spacing" />
            <Row>
              <Col mdOffset={2} md={8} xs={10} xsOffset={1} className="box">
                <div className="rules">
                  <div className="description">
                    <h4>
                      <span className="pink-dash hidden-xs" />
                      regulament concurs
                      <span className="pink-dash hidden-xs" />
                    </h4>
                  </div>
                  <a href="https://docs.google.com/document/d/1rnNdTlI2nrcevCe1URt2FOzU1UAMpCTkMms8-QbI1VE/pub" target="_blank"><span className="section-icon doc" /></a>
                </div>
              </Col>
            </Row>
            <Row className="small-spacing" />
            <Row className="contact">
              <h4>Contact</h4>
              <ul>
                <li>
                  Organizatori: contact@infoeducatie.ro (Emil Onea)
                </li>
                <li>
                  Website: ping@infoeducatie.ro
                </li>
              </ul>
              <h4>Juriu</h4>
              <ul>
                <li>
                  Software educațional: educational@infoeducatie.ro
                </li>
                <li>
                  Multimedia: multimedia@infoeducatie.ro
                </li>
                <li>
                  Software utilitar: utilitar@infoeducatie.ro
                </li>
                <li>
                  Roboți: roboti@infoeducatie.ro
                </li>
                <li>
                  Web: web@infoeducatie.ro
                </li>
              </ul>
            </Row>
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
