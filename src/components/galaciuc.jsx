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
                    <Col mdOffset={2} md={8}>
                        <p className="description">
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
                    <Col mdOffset={2} md={9}>
                        <div className="category yellow">
                        </div>

                        <div className="category blue">
                        </div>

                        <div className="category green">
                        </div>

                        <div className="category pink">
                        </div>

                        <div className="category black">
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>;
    </div>;
  }
});
