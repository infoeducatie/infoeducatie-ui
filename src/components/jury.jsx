"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import gravatar from "../lib/gravatar";
import VladAvatar from "../../assets/img/jury/vlad_temian.png";
import SabinBuragaAvatar from "../../assets/img/jury/sabin_buraga.jpg";
import RobertAvatar from "../../assets/img/jury/robert_dolca.png";
import AlexPAvatar from "../../assets/img/jury/alex_palcuie.png";
import AndreiAAvatar from "../../assets/img/jury/andrei_adoamnei.png";
import SabinMarcuAvatar from "../../assets/img/jury/sabin_marcu.png";
import RobertaTomegaAvatar from "../../assets/img/jury/roberta_tomega.png";
import RazvanDeaconescuAvatar from "../../assets/img/jury/razvan_deaconescu.png";
import JulianAvatar from "../../assets/img/jury/julian_atanasoae.png";
import AndreiMAvatar from "../../assets/img/jury/andrei_muntean.png";
import AlexCiteaAvatar from "../../assets/img/jury/alex_citea.png";
import LuizaBubatuAvatar from "../../assets/img/jury/luiza_bubatu.jpg";
import CarmenLascoiuAvatar from "../../assets/img/jury/carmen_lascoiu.jpg";
import AlexComanAvatar from "../../assets/img/jury/alex_coman.png";
import EmilOneaAvatar from "../../assets/img/jury/emil_onea.jpg";
import DanielPopaAvatar from "../../assets/img/jury/daniel_popa.jpg";
import DefaultAvatar from "../../assets/img/jury/default.png";
import DefaultDocument from "../../assets/img/icons/doc.png";


export default React.createClass({
  displayName: "Jury",
  render() {
    let presedinte = [
      {"avatar": SabinBuragaAvatar, "name": "Sabin Buraga", "occupation": "Conferențiar la Universitatea \"Alexandru Ioan Cuza\" din Iași"},
    ];

    let presedinteExecutiv = [
      {"avatar": DefaultAvatar, "name": "Marilena Oprea", "occupation": "I.S.J. Vrancea"},
    ];

    let secretar = [
      {"avatar": DefaultAvatar, "name": "Fâsan Mihail", "occupation": "I.S.J. Vrancea"},
    ];

    let comisiaTehnica = [
      {"avatar": EmilOneaAvatar, "name": "Emil Onea", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      {"avatar": DefaultAvatar, "name": "Dan Roșioru", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      {"avatar": DefaultAvatar, "name": "Roxana Tâmplaru", "occupation": "Profesor @ Colegiul „Stefan Odobleja” Craiova"},
      {"avatar": DefaultAvatar, "name": "Cătălina Burlacu", "occupation": "Profesor @ Colegiul Dunărea Galaţi"},
    ];

    var educational = [
        {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul National 'Aurel Vlaicu' Orastie"},
        {"avatar": RazvanDeaconescuAvatar, "name": "Răzvan Deaconescu", "occupation": "Sef lucrari @ Universitatea 'Politehnica' Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Ovidiu Roșca", "occupation": "Profesor @ Liceul 'Dragos Voda' Sighetu Marmatiei"},
        {"avatar": DefaultAvatar, "name": "Emilian Bacila", "occupation": "student @ University of Cambridge"},
        {"avatar": AndreiMAvatar, "name": "Andrei Muntean", "occupation": "student @ University of Manchester"},
        {"avatar": JulianAvatar, "name": "Iulian Atănăsoae", "occupation": "student @ Facultatea de Matematică și Informatică din București"}
    ];
    var media = [
        {"avatar": DefaultAvatar, "name": "Florentina Hora", "occupation": "Profesor @ Colegiul National 'Samuil Vulcan' Beius"},
        {"avatar": RobertaTomegaAvatar, "name": "Roberta Tomegea", "occupation": "studenta @ Universitatea Politehnica Timișoara"},
        {"avatar": LuizaBubatuAvatar, "name": "Luiza Bubatu", "occupation": "studenta @ Universitatea Tehnică Cluj-Napoca"},
        {"avatar": CarmenLascoiuAvatar, "name": "Carmen Lascoiu", "occupation": "studenta @ Universitatea Națională de Arte Teatrale 'I. L. Caragiale' București"}
    ];
    var robots = [
        {"avatar": DefaultAvatar, "name": "Ovidiu Domsa", "occupation": "Profesor @ Universitatea '1 Decembrie' Alba Iulia"},
        {"avatar": DefaultAvatar, "name": "Maria Stan", "occupation": "Profesor @ Colegiul Tehnic 'Radu Negru' Galati"},
        {"avatar": DefaultAvatar, "name": "Rodica Pintea", "occupation": "Profesor @ Liceul 'Grigore Moisil' Bucureşti"},
        {"avatar": DefaultAvatar, "name": "Ovidiu Tirian", "occupation": "Sef lucrari @ Universitatea Politehnică Timișoara - Inginerie Hunedoara"},
        {"avatar": DefaultAvatar, "name": "Mircea Bratan", "occupation": "Inginer Software @ Tremend Software Consulting"}
    ];
    var utilitar = [
        {"avatar": DefaultAvatar, "name": "Spătărel Dan", "occupation": "Profesor @ Colegiul National Tudor Vianu Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Claudia Buran", "occupation": "Profesor @ Colegiul National Samuil Vulcan Beius, jud. Bihor"},
        {"avatar": AlexCiteaAvatar, "name": "Alexandru Cîtea", "occupation": "Malware Analyst @ Bitdefender"},
        {"avatar": AlexComanAvatar, "name": "Alexandru Coman", "occupation": "Cloud Engineer  @ Cloudbase"},
        {"avatar": VladAvatar, "name": "Vlad Temian", "occupation": "Software Developer @ Presslabs"},
        {"avatar": gravatar("d1fa1134342ae05234ff6432ad74661a"), "name": "Alexandru Buicescu", "occupation": "Inginer Software @ Indycoding"}
    ];
    var web = [
        {"avatar": DefaultAvatar, "name": "Narcisa Dima", "occupation": "Profesor @ Liceul 'Ion Barbu' Pitesti"},
        {"avatar": DefaultAvatar, "name": "Istrate Nicolae", "occupation": "Profesor @ Colegiul National 'Ienachita Vacarescu' din Targoviste"},
        {"avatar": AndreiAAvatar, "name": "Andrei Adoamnei", "occupation": "Head of Development @ Conversion Network LLC"},
        {"avatar": "https://s.gravatar.com/avatar/71070bfa9bd63bd3ef6fd52e787ef165?s=100", "name": "Robert Dolca", "occupation": "Inginer Software @ Intel"},
        {"avatar": AlexPAvatar, "name": "Alex Palcuie", "occupation": "Referent @ Cancelaria Prim-Ministrului"},
        {"avatar": SabinMarcuAvatar, "name": "Sabin Marcu", "occupation": "student @ University of Southampton"}
    ];

    var criteria = [
      {"name": "Educațional", "link": "http://data.infoeducatie.ro/manual/educational.pdf"},
      {"name": "Multimedia", "link": "http://data.infoeducatie.ro/manual/multimedia.pdf"},
      {"name": "Roboți", "link": "http://data.infoeducatie.ro/manual/roboti.pdf"},
      {"name": "Utilitar", "link": "http://data.infoeducatie.ro/manual/utilitar.pdf"},
      {"name": "Web", "link": "http://data.infoeducatie.ro/manual/web.pdf"}
    ];

    return <div className="jury">
        <div className="blue-section-wrapper">
          <Grid className="blue-section">
            <Header isLoggedIn={this.props.isLoggedIn}
                    language={this.props.language}
                    changeLanguage={this.props.changeLanguage}
                    login={this.props.login}
                    logout={this.props.logout} />
            <Row className="xsmall-spacing" />
            <Row>
              <Col xs={12}>
                <h1>Juriul InfoEduca&#355;ie </h1>
                <h2>Ediția {this.props.current.edition.name}</h2>
              </Col>
            </Row>
          </Grid>
        </div>

        <Grid className="white-section">
          <Row>
            <JuryDescription name="președinte executiv" members={presedinteExecutiv}/>
            <JuryDescription name="președinte" members={presedinte}/>
            <JuryDescription name="secretar" members={secretar}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon educational" name="comisia software educațional" members={educational}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon utilitar" name="comisia software utilitar" members={utilitar}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon web" name="comisia aplicații web" members={web}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon roboti" name="comisia roboți" members={robots}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon multimedia" name="comisia multimedia" members={media}/>
          </Row>
          <Row>
            <JuryDescription name="comisia tehnică" members={comisiaTehnica}/>
          </Row>
        </Grid>

        <div className="orange-section-wrapper">
          <Grid className="orange-section">
            <Row>
              <Col className="block">
                <Row className="jury-criteria-desc">
                    <span className="pink-dash" />
                      criterii de jurizare
                    <span className="pink-dash" />
                </Row>
                <Row className="jury-criteria-documents">
                  {criteria.map(function(doc) {
                    return <div className="jury-criteria">
                      <div className="jury-criteria-txt">{doc.name}</div>
                      <div className="jury-criteria-img"><a href={doc.link} target="_blank"><img src={DefaultDocument} alt={doc.link} /></a></div>
                    </div>;
                  })}
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>

    </div>;
  }
});
