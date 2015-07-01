"use strict";

import React from "react";

import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "./seminars.less";
import BuragaAvatar from "../../assets/img/seminars/sabin_buraga.jpg";
import BogdanAvatar from "../../assets/img/seminars/bogdan_gaza.jpg";
import ViviAvatar from "../../assets/img/alumni/vivi.png";


export default React.createClass({
  displayName: "Seminars",

  getInitialState() {
    return {
      seminars: [
        {
          "description": `O introducere în conceptele necesare dezvoltării
                          aplicaților bazate pe paradigma pe care cloud
                          computing o introduce. Punem la discuție
                          funcționalitățile, șabloanele de dezvoltare și
                          constrângerile pe care o platformă de tip cloud
                          le oferă. Discuția va fi în jurul servicilor puse la
                          dispoziție de Amazon Web Services.`,
          "lector": {
            "avatar": BogdanAvatar,
            "name": "Bogdan Gâza",
            "position": "software engineer @ twitter"
          },
          "title": "Architecting for the cloud",
          "color": "green"
        },
        {
          "description": `Ma numesc Octavian Costache. In Romania am fost
                          fondatorul doizece.ro si didactic.ro. Am vandut
                          doizece.ro si m-am mutat in NY, unde am lucrat la
                          Google timp de cinci ani (timp in care am construit
                          produse populare si apreciate ca Google Finance, un
                          feature in Gmail numit Multiple Inboxes, feature-ul
                          de bookmarking pe Google Maps). Acum sunt fondatorul
                          unui startup in NY. Mi-ar face placere sa discutam
                          despre viata si lumea startup-urilor, cum sa
                          construiesti un produs, cum a fost viata la Google,
                          cum este viata dupa Google, sau de ce Infoeducatia a
                          fost unul din evenimentele formative din viata si din
                          cariera mea de pana acum. Orice intrebari despre
                          Google, New York, startups, software development sunt
                          binevenite si mi-ar placea sa incerc sa lamuresc
                          orice curiozitate sau nelamuriri aveti despre orice. `,
          "lector": {
            "avatar": ViviAvatar,
            "name": "Octavian Costache",
            "position": "founder & cto @ spring"
          },
          "title": "The answer to life, the universe and everything",
          "color": "orange"
        },
        {
          "description": `Sub titlul "O lectie de anatomie Web. Disectia unui
                          document HTML" se ascunde o prezentare referitoare
                          la posibilitatea de a selecta/accesa parti dintr-o
                          pagina Web. Vom descrie cei mai interesanti selectori
                          CSS3, vom relata ce inseamna limbajul XPath si vom
                          aplica putina programare. `,
          "lector": {
            "avatar": BuragaAvatar,
            "name": "Dr. Sabin Buraga",
            "position": "Profesor @ universitatea \"alexandru ioan cuza\""
          },
          "title": "O lectie de anatomie Web",
          "color": "black"
        }
      ]
    };
  },

  renderSeminar(seminar) {
    let className = ctx("seminar-container", seminar.color);

    return <Row key={seminar.id}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10} xs={12}>
        <Row className="xsmall-spacing" />
        <Row>
          <Col className={className} xs={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col xs={3} xsOffset={1}>
                <Row className="small-spacing" />
                <div className="seminar-image">
                  <img src={seminar.lector.avatar} />
                </div>
              </Col>
              <Col xs={8} >
                <h4 className="seminar-title">{seminar.title}</h4>
                <p>{seminar.description}</p>
                <Row className="xsmall-spacing" />
                <h5 className="seminar-name">{seminar.lector.name}</h5>
                <p className="seminar-position">{seminar.lector.position}</p>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
      </Col>
    </Row>;
  },

  render() {
    return <div className="seminars">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h1>Seminarii InfoEducație</h1>
              <h2>Ediția 2015</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        {this.state.seminars.map(this.renderSeminar)}
      </Grid>
   </div>;
  }
});
