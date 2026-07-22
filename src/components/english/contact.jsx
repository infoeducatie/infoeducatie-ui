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
            <div className="contact-details">
              <section className="contact-group" aria-labelledby="contact-general">
                <h2 id="contact-general" className="content-heading">InfoEducație team</h2>
                <ul className="contact-list">
                  <li>
                    <span>Organization</span>
                    <a href="mailto:contact@infoeducatie.ro">contact@infoeducatie.ro</a>
                    <small>Emil Onea</small>
                  </li>
                  <li>
                    <span>Website</span>
                    <a href="mailto:ping@infoeducatie.ro">ping@infoeducatie.ro</a>
                  </li>
                </ul>
              </section>
              <section className="contact-group" aria-labelledby="contact-jury">
                <h2 id="contact-jury" className="content-heading">Jury</h2>
                <ul className="contact-list">
                  <li><span>Educational software</span><a href="mailto:educational@infoeducatie.ro">educational@infoeducatie.ro</a></li>
                  <li><span>Multimedia</span><a href="mailto:multimedia@infoeducatie.ro">multimedia@infoeducatie.ro</a></li>
                  <li><span>Software</span><a href="mailto:utilitar@infoeducatie.ro">utilitar@infoeducatie.ro</a></li>
                  <li><span>Robots</span><a href="mailto:roboti@infoeducatie.ro">roboti@infoeducatie.ro</a></li>
                  <li><span>Web</span><a href="mailto:web@infoeducatie.ro">web@infoeducatie.ro</a></li>
                </ul>
              </section>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>;
  }
});
