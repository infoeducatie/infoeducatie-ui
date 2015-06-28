"use strict";

import React from "react";
import { Grid, Col, Row, PanelGroup, Panel } from "react-bootstrap";

import Header from "./header";
import "./register-project.less";

export default React.createClass({
  displayName: "RegisterProjectPage",

  render() {
    return <div className="register-project">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row>
            <Col xs={12}>
              <h1>Înregistrează un proiect</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Te rugăm să completezi acest formular cu grijă</h2>
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <Col sm={6} smOffset={3}>
          <Row className="small-spacing" />
          <PanelGroup onSelect={this.handleSelect}
                      defaultActiveKey='2'
                      accordion>
            <Panel header='Înregistrare Participant'
                   eventKey='1'
                   bsStyle='success'>
              Formular de înregistrare participant
            </Panel>
            <Panel header='Înregistrare Proiect'
                   eventKey='2'>
              Formular de înregistrare proiect
            </Panel>
            <Panel header='Înregistrare Coechipier'
                   eventKey='3'>
              Formular de înregistrare coechipier
            </Panel>
            <Panel header='Finalizare'
                   eventKey='4'>
              Aici confirmă...
            </Panel>
          </PanelGroup>
        </Col>
      </Grid>
    </div>;
  }
});
