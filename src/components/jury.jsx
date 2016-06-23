"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import gravatar from "../lib/gravatar";
import MirceaAvatar from "../../assets/img/jury/mircea_zamfira.jpg";
import VladAvatar from "../../assets/img/jury/vlad_durnea.jpg";
import PetruAvatar from "../../assets/img/jury/petru_dimitriu.jpg";
import BiancaAvatar from "../../assets/img/jury/bianca_chiar.jpg";
import ErvinAvatar from "../../assets/img/jury/ervin_szabo.jpg";
import ValerAvatar from "../../assets/img/jury/valer_szabo.jpg";
import AlexandruAvatar from "../../assets/img/jury/alexandru_cristian.jpg";
import StefanAvatar from "../../assets/img/jury/stefan_stolniceanu.jpg";
import DianaAvatar from "../../assets/img/jury/diana_minca.jpg";
import CatalinAvatar from "../../assets/img/jury/catalin_stoian.jpg";
import AlexandruIAvatar from "../../assets/img/jury/alexandru_ionascu.jpg";
import MariusAvatar from "../../assets/img/jury/marius_gibu.jpg";
import CarmenLascoiuAvatar from "../../assets/img/jury/carmen_lascoiu.jpg";
import CezarAvatar from "../../assets/img/jury/cezar_andrici.jpg";
import CasianAvatar from "../../assets/img/jury/casian_lacatusu.jpg";
import EmilOneaAvatar from "../../assets/img/jury/emil_onea.jpg";
import DanielPopaAvatar from "../../assets/img/jury/daniel_popa.jpg";
import DefaultAvatar from "../../assets/img/jury/default.png";
import DefaultDocument from "../../assets/img/icons/doc.png";


export default React.createClass({
  displayName: "Jury",
  render() {
    let presedinte = [
    //{"avatar": EmilOneaAvatar, "name": "Emil Onea", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
     // {"avatar": SabinBuragaAvatar, "name": "Sabin Buraga", "occupation": "Conferențiar la Universitatea \"Alexandru Ioan Cuza\" din Iași"}
    ];

    let presedinteExecutiv = [

    //  {"avatar": DefaultAvatar, "name": "Marilena Oprea", "occupation": "I.S.J. Vrancea"}
    ];

    let secretar = [
    //  {"avatar": DefaultAvatar, "name": "Fâsan Mihail", "occupation": "I.S.J. Vrancea"}
    ];

    let comisiaTehnica = [
    //    {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul National 'Aurel Vlaicu' Orastie"},
    //  {"avatar": DefaultAvatar, "name": "Dan Roșioru", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
    //  {"avatar": DefaultAvatar, "name": "Roxana Tâmplaru", "occupation": "Profesor @ Colegiul „Stefan Odobleja” Craiova"},
    //  {"avatar": DefaultAvatar, "name": "Cătălina Burlacu", "occupation": "Profesor @ Colegiul Dunărea Galaţi"}
    ];

    var educational = [
    //    {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul National 'Aurel Vlaicu' Orastie"},
    //    {"avatar": DianaAvatar, "name": "Diana Ghinea", "occupation": "Studentă la Universitatea din București, Facultatea de Matematică și Informatică"},
    //    {"avatar": PetruAvatar, "name": "Petru Dimitriu", "occupation": "Student la Universitatea Tehnică Gheroghe Asachi din Iași, Facultatea de Automatică și Calculatoare"},
    //    {"avatar": DefaultAvatar, "name": "Emilian Bacila", "occupation": "student @ University of Cambridge"},
    //    {"avatar": AndreiMAvatar, "name": "Andrei Muntean", "occupation": "student @ University of Manchester"},
    //    {"avatar": JulianAvatar, "name": "Iulian Atănăsoae", "occupation": "student @ Facultatea de Matematică și Informatică din București"}
    ];
    var media = [
    //    {"avatar": ErvinAvatar, "name": "Ervin Szabo", "occupation": "Student la Facultatea de Teatru si Televiziune, Universitatea Babeș-Bolyai"},
    //    {"avatar": ValerAvatar, "name": "Valer Szabo", "occupation": "Student la Facultatea de Teatru si Televiziune, Universitatea Babeș-Bolyai"},
    //    {"avatar": VladAvatar, "name": "Vlad Durnea", "occupation": "Graphic Designer, Photo & Video Editor, Photographer, Tribe Chife and Jedi Grand Master"},
    //    {"avatar": BiancaAvatar, "name": "Bianca Chiar", "occupation": "Video Editor and Photography Passionate"},
    //    {"avatar": DefaultAvatar, "name": "Daniel Gherasim", "occupation": "Profesor la CCD Vrancea"},
    //    {"avatar": CarmenLascoiuAvatar, "name": "Carmen Lascoiu", "occupation": "studenta @ Universitatea Națională de Arte Teatrale 'I. L. Caragiale' București"}
    ];
    var robots = [
    //    {"avatar": MirceaAvatar, "name": "Mircea Zamfira", "occupation": "Membru al echipei de robotică FLEX, Student la Universitatea Politehnica Bucuresti"},
    //    {"avatar": MariusAvatar, "name": "Marius Gibu", "occupation": "Membru al echipei de robotică FLEX, Student la Universitatea Politehnica Bucuresti"},
    //    {"avatar": DefaultAvatar, "name": "Rodica Pintea", "occupation": "Profesor @ Liceul 'Grigore Moisil' Bucureşti"},
    //    {"avatar": DefaultAvatar, "name": "Ovidiu Tirian", "occupation": "Sef lucrari @ Universitatea Politehnică Timișoara - Inginerie Hunedoara"},
    //    {"avatar": DefaultAvatar, "name": "Mircea Bratan", "occupation": "Inginer Software @ Tremend Software Consulting"},
    //    {"avatar": DefaultAvatar, "name": "Adriana Chereș", "occupation": "Profesor @ Liceul Teoretic Nicolae Balcescu Cluj-Napoca"},
    //    {"avatar": DefaultAvatar, "name": "Mihai Agape", "occupation": "Palatul Copiilor Drobeta Turnu Severin, Filiala Orșova"}
    ];
    var utilitar = [
    //    {"avatar": AlexandruIAvatar, "name": "Alexandru Ionașcu", "occupation": "Student la Universitatea din București, Facultatea de Matematică și Informatică"},
    //    {"avatar": CezarAvatar, "name": "Cezar Andrici", "occupation": "Full Stack Developer at CTF365"},
    //    {"avatar": StefanAvatar, "name": "Ștefan Stolniceanu", "occupation": "Software Development Engineer Intern and All Around Community Enthusiast"},
    //    {"avatar": AlexComanAvatar, "name": "Alexandru Coman", "occupation": "Cloud Engineer  @ Cloudbase"},
    //    {"avatar": VladAvatar, "name": "Vlad Temian", "occupation": "Software Developer @ Presslabs"},
    //    {"avatar": gravatar("d1fa1134342ae05234ff6432ad74661a"), "name": "Alexandru Buicescu", "occupation": "Inginer Software @ Indycoding"}
    ];
    var web = [
    //    {"avatar": CasianAvatar, "name": "Casian Lăcătușu", "occupation": "Student la Universitatea Politehnică din București, Facultatea de Automatică și Calculato"},
    //    {"avatar": AlexandruAvatar, "name": "Alexandru Cristian", "occupation": "Student la Drexel University, College of Computing and Informatics"},
    //    {"avatar": CatalinAvatar, "name": "Cătălin Stoian", "occupation": "Student la Facultatea de Informatica, Universitatea „Alexandru Ioan Cuza” "},
    //    {"avatar": "https://s.gravatar.com/avatar/71070bfa9bd63bd3ef6fd52e787ef165?s=100", "name": "Robert Dolca", "occupation": "Inginer Software @ Intel"},
    //    {"avatar": AlexPAvatar, "name": "Alex Palcuie", "occupation": "Referent @ Cancelaria Prim-Ministrului"},
    //    {"avatar": SabinMarcuAvatar, "name": "Sabin Marcu", "occupation": "student @ University of Southampton"}
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
                    current={this.props.current}
                    language={this.props.language}
                    changeLanguage={this.props.changeLanguage}
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
            <p>
              <span className="pink-dash" />
              &nbsp; Juriul va fi afișat în curând &nbsp;
              <span className="pink-dash" />
            </p>
          </Row>
        </Grid>

{/*
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
*/}
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
                    return <div key={doc.link} className="jury-criteria">
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
