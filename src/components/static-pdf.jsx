"use strict";

import React from "react";
import { Grid, Col, Row, Table, Glyphicon } from "react-bootstrap";
import Header from "./header";

import PDFJS from "./pdf-js";

import "./static-pdf.less";

import UtilityPDF from "../../assets/static/utility.pdf";
import EducationalPDF from "../../assets/static/educational.pdf";
import WebPDF from "../../assets/static/web.pdf";
import MediaPDF from "../../assets/static/media.pdf";
import MobilePDF from "../../assets/static/mobile.pdf";
import RobotsPDF from "../../assets/static/robots.pdf";
import RegulamentPDF from "../../assets/static/regulament.pdf";


export default React.createClass({
  displayName: "StaticPdfFile",
  getInitialState() {
    return {
      pageNumber: 1,
      pageCount: 1,
      statics: {
        regulament: {
          title: "Regulament InfoEducație Ediția 2015",
          subtitle: "Concurs Național de Informatică",
          file: RegulamentPDF
        },
        utilitar: {
          title: "Criterii de Jurizare",
          subtitle: "Secțiunea Software Utilitar",
          file: UtilityPDF
        },
        educational: {
          title: "Criterii de Jurizare",
          subtitle: "Secțiunea Software Educational",
          file: EducationalPDF
        },
        web: {
          title: "Criterii de Jurizare",
          subtitle: "Secțiunea Web",
          file: WebPDF
        },
        multimedia: {
          title: "Criterii de Jurizare",
          subtitle: "Secțiunea Multimedia",
          file: MediaPDF
        },
        roboti: {
          title: "Criterii de Jurizare",
          subtitle: "Secțiunea Roboți",
          file: RobotsPDF
        },
        mobile: {
          title: "Criterii de Jurizare",
          subtitle: "Secțiunea Mobile",
          file: MobilePDF
        }
      }
    }
  },

  setCountPages(pageCount) {
    this.setState({
      pageCount: pageCount
    })
  },

  increasePageNumber() {
    let pageNumber = this.state.pageNumber;
    this.setState({
      pageNumber: pageNumber < this.state.pageCount ? pageNumber + 1 : pageNumber
    })
  },

  decreasePageNumber() {
    this.setState({
      pageNumber: this.state.pageNumber == 1 ? 1 : this.state.pageNumber - 1
    })
  },

  render() {
    let pdf = this.state.statics[this.props.params.type];

    return <div className="static-pdf">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row className="xsmall-spacing" />
          <Row>
            <Col>
              <h1>{pdf.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>{pdf.subtitle}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        <Row className="xsmall-spacing" />
        <Row>
          <Col md={2} mdOffset={2} xs={4} className="navigation">
            <span className="link link-primary"
                  onClick={this.decreasePageNumber} >
              <Glyphicon glyph="chevron-left"
                       className="pages"
                       onClick={this.decreasePageNumber} /> înapoi

            </span>
          </Col>
          <Col md={2} mdOffset={4} xs={2} xsOffset={4} className="navigation">
            <span className="link link-primary"
                  onClick={this.increasePageNumber} >
              înainte
              <Glyphicon glyph="chevron-right"
                       className="pages"
                       onClick={this.increasePageNumber} />

            </span>
          </Col>
        </Row>
        <Row>
          <Col md={8} mdOffset={2}>
            <PDFJS file={pdf.file}
                   page={this.state.pageNumber}
                   setCountPages={this.setCountPages}/>
          </Col>
        </Row>
        <Row className="xsmall-spacing" />
        <Row>
          <Col md={2} mdOffset={2} xs={4} className="navigation">
            <span className="link link-primary"
                  onClick={this.decreasePageNumber} >
              <Glyphicon glyph="chevron-left"
                       className="pages" /> înapoi

            </span>
          </Col>
          <Col md={2} mdOffset={4} xs={2} xsOffset={4} className="navigation">
            <span className="link link-primary"
                  onClick={this.increasePageNumber} >
              înainte
              <Glyphicon glyph="chevron-right"
                       className="pages" />

            </span>
          </Col>
        </Row>
      </Grid>
    </div>;
  }
});
