"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { ExternalLink } from "lucide-react";
import { withTranslation } from "react-i18next";

import { Row, Col, Grid } from "@ui/bootstrap";
import Header from "./header";

const scheduleUrl = "https://docs.google.com/document/d/e/2PACX-1vRRrkfFWKoIkJ_XrGeuXJEExZGbfQrryhLehwAQ-mRfu_MkNds0X3nF0JuXBVx69_a-zcqgO3SGb0XD/pub?embedded=true";

const SchedulePage = createLegacyComponent({
  displayName: "SchedulePage",

  render() {
    const editionName = this.props.edition.name ||
      this.props.edition.count ||
      this.props.edition.year;

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
              <h1>{this.props.t("schedule.title")}</h1>
              <h2>{this.props.t("edition.label", { edition: editionName })}</h2>
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
                 <h2 className="content-heading">{this.props.t("schedule.contentTitle", { edition: editionName })}</h2>
                 <p>{this.props.t("schedule.description")}</p>
               </div>
               <a className="schedule-external" href={scheduleUrl} target="_blank" rel="noreferrer">
                 {this.props.t("schedule.open")} <ExternalLink aria-hidden="true" size={18} />
               </a>
             </div>
             <iframe
               className="schedule-document"
               title={this.props.t("schedule.documentTitle")}
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

export default withTranslation("public")(SchedulePage);
