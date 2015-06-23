"use strict";

import React from "react";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./photos.less";

import Cover2014 from "../../assets/img/2014.jpg";
import Cover2013 from "../../assets/img/2013.jpg";
import Cover2012 from "../../assets/img/2012.jpg";
import Cover2011 from "../../assets/img/2011.jpg";
import Cover2010 from "../../assets/img/2010.jpg";
import Cover2009 from "../../assets/img/2009.jpg";
import Cover2008 from "../../assets/img/2008.jpg";
import Cover2007 from "../../assets/img/2007.jpg";
import Cover2006 from "../../assets/img/2006.jpg";
import Cover2005 from "../../assets/img/2005.jpg";
import Cover2004 from "../../assets/img/2004.jpg";


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
        <div className="white-section-wrapper">
            <Grid className="white-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={10} mdOffset={1}>
                        <Row>
                            <div className="photo-cover-wrapper">
                                <a href="google.ro" target="_blank">
                                    <div className="cover year-2014">
                                    </div>
                                    <div className="more-details">Fotografii</div>
                                </a>
                                <div className="year">
                                    <span className="pink-dash" />
                                        2014
                                    <span className="pink-dash" />
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </div>
    </div>;
  }
});
