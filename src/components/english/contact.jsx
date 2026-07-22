"use strict";

import createLegacyComponent from "@lib/create-legacy-component";

import { Row, Col, Grid } from "@ui/bootstrap";
import Header from "../header";

import "../../main.less";


export default createLegacyComponent({
  displayName: "ContactPage",

  render() {
    return <div className="contact">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      current={this.props.current}
                      changeLanguage={this.props.changeLanguage}
                      language={this.props.language}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Row className="small-spacing" />
            <Col xs={12}>
              <h1>Contact</h1>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid className="white-section">
        <Row>
          <Col mdOffset={1} md={10}>
            <Row className="small-spacing" />
            <Row className="contact">
              <h2 className="content-heading">Contact</h2>
              <ul>
                <li>
                  Organizers: contact@infoeducatie.ro (Emil Onea)
                </li>
                <li>
                  Website: ping@infoeducatie.ro
                </li>
              </ul>
              <h2 className="content-heading">Jury</h2>
              <ul>
                <li>
                  Educational Software: educational@infoeducatie.ro
                </li>
                <li>
                  Multimedia: multimedia@infoeducatie.ro
                </li>
                <li>
                  Software: utilitar@infoeducatie.ro
                </li>
                <li>
                  Robots: roboti@infoeducatie.ro
                </li>
                <li>
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
