"use strict";

import React from "react";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./home.less";
import Google from "../../assets/img/sponsors/google.png";
import Intel from "../../assets/img/sponsors/intel.png";
import Orange from "../../assets/img/sponsors/orange.png";

export default React.createClass({

  displayName: "Home",
  render() {
    return <div className="home">
        <div className="blue-section-wrapper">
            <Grid className="blue-section">
                <Row>
                    <Col md={12}>
                        <Header isLoggedIn={this.props.isLoggedIn}
                                login={this.props.login}
                                logout={this.props.logout} />
                    </Col>
                </Row>
                <Row className="big-spacing" />
                <Row>
                    <Col md={12}>
                        <h1>InfoEducație Ediția 2015</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h2>Concurs Național de Informatică</h2>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col md={12}>
                        <p className="tagline">The best software engineering contest in the world.</p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col md={4} mdOffset={2}>
                        <p className="left-button">
                            <a href="#" className="link link-primary">Înregistrează-te</a>
                        </p>
                    </Col>
                    <Col md={4}>
                        <p className="right-button">
                            <a href="#" className="link link-secondary">Mai multe...</a>
                        </p>
                    </Col>
                </Row>
                <Row className="big-spacing" />
                <Row className="statistics">
                    <Col md={2} mdOffset={3} xs={4}>
                        <p className="description">Participanți</p>
                        <p className="value">250+</p>
                    </Col>
                    <Col md={2} xs={4}>
                        <p className="description">Proiecte</p>
                        <p className="value">120+</p>
                    </Col>
                    <Col md={2} xs={4}>
                        <p className="description">Județe</p>
                        <p className="value">35+</p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
            </Grid>
        </div>

        <div className="green-section-wrapper">
            <Grid className="green-section">
                <Row className="small-spacing" />
                <Row className="row">
                    <Col md={4} mdOffset={1} className="left">
                        <h1>Știri</h1>
                        <Row className="big-spacing" />
                        <p className="date">16 aprilie 2069</p>
                        <h2>Deadline-ul de înscriere a fost prelungit.</h2>
                        <Row className="big-spacing" />
                        <p className="message">Deadline-ul de înscriere pentru InfoEducație Online a
                        fost prelungit până marți 21 aprilie. Sursele trebuie
                        trimise până joi noaptea pe Github.</p>
                    </Col>
                    <Col md={4} mdOffset={1} className="right">
                        <Row className="big-spacing" />
                        <p className="date">18 martie 2015</p>
                        <p className="message">Au inceput inscrierile pentru InfoEducatie 2015</p>

                        <Row className="big-spacing" />
                        <p className="date">08 martie 2015</p>
                        <p className="message">Website-ul InfoEducatie Online 2015 a fost
                        actualizat</p>
                    </Col>
                </Row>
                <Row className="big-spacing" />
            </Grid>
        </div>

        <div className="gray-section-wrapper">
            <Grid className="gray-section">
                <Row className="big-spacing" />
                <Row className="row">
                    <Col md={6} mdOffset={6}>
                        <h1>Alumnus</h1>
                        <Row className="small-spacing" />
                        <p className="quote">La momentul respectiv părea o
                        joacă, acum infoarena este o organizație cu o
                        activitate foarte solidă și cu un impact mare în
                        rândul elevilor pasionați de informatică.</p>
                        <Row className="small-spacing" />
                        <p className="alumnus-name">Cristian Strat</p>
                        <p className="alumnus-position">
                            Ex Growth Manager @ Twitter
                        </p>
                    </Col>
                </Row>
            </Grid>
        </div>

        <div className="yellow-section-wrapper">
            <div className="yellow-section container-fluid">
                <Row>
                    <Col md={4} mdOffset={2} className="text middle-align">
                        <div>
                            <h1>Tabăra Gălăciuc</h1>
                            <p className="data">
                                <span className="pink-dash"></span> 2 - 8 August 2015 <span className="pink-dash"></span>
                            </p>
                            <p className="edition">Ediția 23</p>
                            <Row className="big-spacing" />
                            <p>
                                <a href="#" className="link link-secondary">
                                    Mai multe poze
                                </a>
                            </p>
                        </div>
                    </Col>
                    <Col md={6} className="grass" />
                </Row>
            </div>
        </div>

        <div className="sponsors-section-wrapper">
            <Grid className="sponsors-section">
                <Row className="big-spacing" />
                <Row>
                    <Col md={12}>
                        <h1>Sponsori Gold</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p className="logos">
                            <img src={Google} />
                            <img src={Intel} />
                            <img src={Orange} />
                        </p>
                    </Col>
                </Row>
            </Grid>
        </div>
    </div>;
  }
});
