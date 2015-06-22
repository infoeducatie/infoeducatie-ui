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
                    <Col md={12}>
                        <Header isLoggedIn={this.props.isLoggedIn}
                                login={this.props.login}
                                logout={this.props.logout} />
                    </Col>
                </Row>
                <Row className="small-spacing header-spacing" />
                <Row>
                    <Col md={12}>
                        <h1>Despre Concursul InfoEducație</h1>
                        <h2>istoric și regulament</h2>
                    </Col>
                </Row>
                <Row className="small-spacing header-spacing" />
            </Grid>
        </div>
        <div className="white-section-wrapper">
            <Grid className="white-section">
                <Row className="small-spacing" />
                <Row>
                    <Col>
                        <h3>Concursul interdisciplinar InfoEducație</h3>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col mdOffset={1} md={10}>
                        <p className="about">
                            Organizat din 1993, este dedicat elevilor cu aptitudini,
                            înclinații și interes pentru crearea aplicațiilor
                            informatice, atât de la profilul informatică cât
                            și de la alte profile. Concursul se desfășoară în
                            patru etape: pe unitatea școlară, locală, județeană
                            și națională. Etapa națională se desfășoară în
                            tabăra Galaciuc, județul Vrancea.
                        </p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col mdOffset={1} md={10}>
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
                    <Col mdOffset={1} md={10}>
                        <h5>Participare la concurs</h5>
                        <p className="about">
                            La fiecare etapă vor fi prezentate lucrări
                            realizate de către elevi, indiferent de anul de
                            studiu (clasele IX - XII). Participarea la etapele
                            ulterioare este hotărâtă de clasamentele etapelor
                            anterioare.
                        </p>
                        <p className="about">
                            În etapa finală există și un concurs <b>open</b>
                            , pe echipe, pe parcursul a 24 de ore. Concursul
                            constă în realizarea unei lucrări software pe o
                            temă dată. Lucrarea îmbina elemente de <b>
                            proiectare, programare și design</b>. În tot
                            timpul taberei finale se vor organiza și sesiuni
                            de comunicare pe teme de inginerie software.
                        </p>
                        <p className="about">
                            Toate mijloacele IT sunt oferite de Colegiul
                            Național Unirea, comunitatea Tulnici și Liceul Vidra.
                        </p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col mdOffset={1} md={10}>
                        <h5>Condiții de participare</h5>
                        <p className="about">
                            Fiecare județ doritor poate participa cu o echipă
                            de <b>4 elevi</b> și un <b>profesor însoțitor</b>
                            , în următoarele condiții:
                        </p>
                        <p className="about listing">
                            <span className="pink-dash" />
                            minim trei lucrări (web, roboți sau IoT, multimedia, software educțional, software utilitar)
                        </p>
                        <p className="about listing">
                            <span className="pink-dash" />
                            cerinte hardware și software rezonabile
                        </p>
                        <p className="about listing">
                            <span className="pink-dash" />
                            nu se admit lucrări accesibile doar prin web
                        </p>
                    </Col>
                </Row>
                <Row className="big-spacing" />
                <Row>
                    <Col mdOffset={3} md={6} className="box">
                        <div className="rules">
                            <div className="description">
                                <span className="pink-dash" />
                                regulament concurs
                                <span className="pink-dash" />
                            </div>
                            <a href="https://docs.google.com/document/d/1rnNdTlI2nrcevCe1URt2FOzU1UAMpCTkMms8-QbI1VE/pub" target="_blank"><span className="section-icon doc" /></a>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    </div>;
  }
});
