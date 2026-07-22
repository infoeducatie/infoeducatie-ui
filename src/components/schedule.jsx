"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { ExternalLink } from "lucide-react";

import { Row, Col, Grid } from "@ui/bootstrap";
import Header from "./header";

const scheduleUrl = "https://docs.google.com/document/d/e/2PACX-1vRRrkfFWKoIkJ_XrGeuXJEExZGbfQrryhLehwAQ-mRfu_MkNds0X3nF0JuXBVx69_a-zcqgO3SGb0XD/pub?embedded=true";

export default createLegacyComponent({
  displayName: "SchedulePage",

  render() {
    return <div className="schedule">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      current={this.props.current}
                      language={this.props.language}
                      changeLanguage={this.props.changeLanguage}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Row className="small-spacing" />
            <Col xs={12}>
              <h1>Program InfoEducație</h1>
              <h2>Ediția {this.props.edition.name}</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid className="white-section">
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
             <div className="schedule-heading">
               <div>
                 <h2 className="content-heading">Programul ediției {this.props.edition.name}</h2>
                 <p>Activitățile și orele sunt actualizate în documentul de mai jos.</p>
               </div>
               <a className="schedule-external" href={scheduleUrl} target="_blank" rel="noreferrer">
                 Deschide programul <ExternalLink aria-hidden="true" size={18} />
               </a>
             </div>
             <iframe
               className="schedule-document"
               title="Program InfoEducatie"
               loading="lazy"
               referrerPolicy="strict-origin-when-cross-origin"
               src={scheduleUrl}
             />
          </Col>
        </Row>
      </Grid>
    </div>;
  }
});
