"use strict";

import React from "react";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./photos.less";


export default React.createClass({
  displayName: "Photos",

  render() {
    return <div className="photos">
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
                        <h1>Albumul Foto InfoEducație</h1>
                        <h2>Oameni și aminitiri</h2>
                    </Col>
                </Row>
            </Grid>
        </div>
    </div>;
  }
});
