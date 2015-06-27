"use strict";

import React from "react";

import { Row, Col, Grid } from "react-bootstrap";
import Header from "./header";

import "./galaciuc.less"


export default React.createClass({
  displayName: "GalaciucPage",

  render() {
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
          <Col mdOffset={1} md={10} xsOffset={1}>
            <Row className="small-spacing" />
            <Row>
                <p className="about">
                Organizat din 1993, este dedicat elevilor cu aptitudini,
                înclinații și interes pentru crearea aplicațiilor
                informatice, atât de la profilul informatică cât
                și de la alte profile. Concursul se desfășoară în
                patru etape: pe unitatea școlară, locală, județeană
                și națională. Etapa națională se desfășoară în
                tabăra Galaciuc, județul Vrancea.
              </p>
            </Row>
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
                    <span className="section-icon robots" />
                  </div>
                  <div className="description">roboți</div>
                </div>

                <div className="category green">
                  <div className="round-icon">
                    <span className="section-icon media" />
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
                    <span className="section-icon utility" />
                  </div>
                  <div className="description">utilitar</div>
                </div>
              </Col>
            </Row>
            <Row className="small-spacing" />
            <Row>
              <h4>Participare la concurs</h4>
              <p className="about">
                  La fiecare etapă vor fi prezentate lucrări
                  realizate de către elevi, indiferent de anul de
                  studiu (clasele IX - XII). Participarea la etapele
                  ulterioare este hotărâtă de clasamentele etapelor
                  anterioare.
              </p>
              <p className="about">
                  În etapa finală există și un concurs <em>open</em>
                  , pe echipe, pe parcursul a 24 de ore. Concursul
                  constă în realizarea unei lucrări software pe o
                  temă dată. Lucrarea îmbina elemente de <em>
                  proiectare, programare și design</em>. În tot
                  timpul taberei finale se vor organiza și sesiuni
                  de comunicare pe teme de inginerie software.
              </p>
              <p className="about">
                  Toate mijloacele IT sunt oferite de Colegiul
                  Național Unirea, comunitatea Tulnici și Liceul Vidra.
              </p>
            </Row>
            <Row className="small-spacing" />
            <Row>
              <h4>Condiții de participare</h4>
              <p className="about">
                  Fiecare județ doritor poate participa cu o echipă
                  de <em>4 elevi</em> și un <em>profesor însoțitor</em>
                  , în următoarele condiții:
              </p>
              <ul>
                <li className="about">
                  minim trei lucrări (web, roboți sau IoT, multimedia,
                  software educțional, software utilitar)
                </li>
                <li className="about">
                  cerinte hardware și software rezonabile
                </li>
                <li className="about">
                  nu se admit lucrări accesibile doar prin web
                </li>
              </ul>
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
                <li className="about">
                  Organizatori: contact@infoeducatie.ro (Emil Onea)
                </li>
                <li className="about">
                  Website: ping@infoeducatie.ro
                </li>
              </ul>
              <h4>Juriu</h4>
              <ul>
                <li className="about">
                  Software educațional: educational@infoeducatie.ro
                </li>
                <li className="about">
                  Multimedia: multimedia@infoeducatie.ro
                </li>
                <li className="about">
                  Software utilitar: utilitar@infoeducatie.ro
                </li>
                <li className="about">
                  Roboți: roboti@infoeducatie.ro
                </li>
                <li className="about">
                  Web: web@infoeducatie.ro
                </li>
              </ul>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>;
  }
});
