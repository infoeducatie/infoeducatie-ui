"use strict";

import React from "react";
import { Grid, Col, Row, Table } from "react-bootstrap";
import Header from "./header";

import PDFJS from "./pdf-js";

import "./static-pdf.less";
import EducationalPDF from "../../assets/static/educational.pdf";


export default React.createClass({
  displayName: "StaticPdfFile",

  render() {
    return <div className="static-pdf">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row className="xsmall-spacing" />
          <Row>
            <Col>
              <h1>{this.props.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>asdasd</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <PDFJS file={EducationalPDF} />
    </div>;
  }
});
