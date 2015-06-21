"use strict";
import React from "react";

import { Grid, Col, Row, Glyphicon } from "react-bootstrap";

import Header from "./header";
import { ProjectCard, ProjectRow } from "./project";

import "./contestants.less";
import "./jury.less";


export default React.createClass({
  displayName: "Participanti",

  getInitialState: function() {
    return {
     projects: [
       {
        "title": "Time Travel",
        "authors": ["claudia rujoiu", "dan stoian"],
        "county": "hunedoara",
        "comments": 7,
        "category": "utilitar"
       },
       {
        "title": "Acționarea automată și securizată a Căilor de Access",
        "authors": ["adriana-patricia blaj", "robert preda"],
        "county": "arad",
        "comments": 5,
        "category": "roboți"
       },
       {
        "title": "Romania e Okay!",
        "authors": ["diana elena ghinea"],
        "county": "bucurești",
        "comments": 1,
        "category": "educațional"
       },
       {
        "title": "Mica Unire",
        "authors": ["georgiana raluca bucutea", "roxana patricia datcu"],
        "county": "brașov",
        "comments": 13,
        "category": "multimedia"
       },
       {
        "title": "Velocity Reporter",
        "authors": ["mihaela costache", "bogdan nechifor"],
        "county": "brăila",
        "comments": 5,
        "category": "web"
       },
       {
        "title": "Acționarea automată și securizată a Căilor de Access",
        "authors": ["adriana-patricia blaj", "robert preda"],
        "county": "arad",
        "comments": 5,
        "category": "roboți"
       },
       {
        "title": "Romania e Okay!",
        "authors": ["diana elena ghinea"],
        "county": "bucurești",
        "comments": 1,
        "category": "educațional"
       },
       {
        "title": "Mica Unire",
        "authors": ["georgiana raluca bucutea", "roxana patricia datcu"],
        "county": "brașov",
        "comments": 13,
        "category": "multimedia"
       },
       {
        "title": "Velocity Reporter",
        "authors": ["mihaela costache", "bogdan nechifor"],
        "county": "brăila",
        "comments": 5,
        "category": "web"
       }],
     showGrid: true,
     showTable: false
   };

  },

  showGrid() {
    this.setState({
      showTable: false,
      showGrid: true
    });
  },
  showTable() {
    this.setState({
      showTable: true,
      showGrid: false
    });
  },


  render() {

    var gridClassName = "icon hidden-xs " + (this.state.showGrid ? '' : 'inactive');
    var tableClassName = "icon hidden-xs " + (this.state.showTable ? '' : 'inactive');

    return <div className="contestants">
        <div className="blue-section-wrapper">
          <Grid className="blue-section">
            <Header isLoggedIn={this.props.isLoggedIn} />
            <Row className="small-spacing" />
            <Row>
              <Col md={12}>
                <h1>Participanți InfoEducație Ediția 2015</h1>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h2>Concurs Național de Informatică</h2>
              </Col>
            </Row>
            <Row className="big-spacing" />
            <Row>
              <Col md={6} mdOffset={3} className="middle-align hidden-xs">
                <Row className="stats">
                  <Col md={4} xs={2} className="right-border">
                      <p className="description">Participanți</p>
                      <p className="value">75</p>
                  </Col>
                  <Col md={4} xs={2} className="right-border">
                      <p className="description">Proiecte</p>
                      <p className="value">39</p>
                  </Col>
                  <Col md={4} xs={2} >
                      <p className="description">Județe</p>
                      <p className="value">17</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
        <Row className="big-spacing" />
        <div className="white-section-wrapper">
          <Grid>
            <Row className="white-section">
              <Col mdOffset={2} md={1}>
                <div className="round-icon"><span className="educational"></span></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="media" /></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="robots" /></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="utility" /></div>
              </Col>
              <Col md={1}>
                <div className="round-icon"><span className="web" /></div>
              </Col>
              <Col mdOffset={2} md={1}>
                <Glyphicon glyph='th-large' className={gridClassName} onClick={this.showGrid} />
              </Col>
              <Col md={1}>
                <Glyphicon glyph='align-justify' className={tableClassName} onClick={this.showTable} />
              </Col>
            </Row>
          </Grid>
          <Grid>
              <Row className="small-spacing" />
              {this.state.showGrid ?
                <Row className="white-section projects-grid hidden-xs">
                    {this.state.projects.map(function(project) {
                      return <ProjectCard
                                title={project.title}
                                authors={project.authors}
                                category={project.category}
                                county={project.county}
                                comments={project.comments} />;
                    })}
                </Row> : null}

              {this.state.showTable ?
                <Row className="white-section projects-list">
                  <Col md={12}>
                    {this.state.projects.map(function(project) {
                      return <ProjectRow
                                title={project.title}
                                authors={project.authors}
                                category={project.category}
                                county={project.county}
                                comments={project.comments} />;
                    })}
                  </Col>
                </Row> : null}
            </Grid>
        </div>
      </div>;
  }
});
