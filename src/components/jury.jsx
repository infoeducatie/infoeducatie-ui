"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";
import { Link } from "react-router"

import Header from "./header";
import JuryDescription from "./jury-description";
import Authentication from "../mixins/authentication";

import "./jury.less";

import VladAvatar from "../../assets/img/jury/vlad_temian.png";
import RobertAvatar from "../../assets/img/jury/robert_dolca.png";
import AlexPAvatar from "../../assets/img/jury/alex_palcuie.png";
import AndreiAAvatar from "../../assets/img/jury/andrei_adoamnei.png";
import SabinMarcuAvatar from "../../assets/img/jury/sabin_marcu.png";
import RobertaTomegaAvatar from "../../assets/img/jury/roberta_tomega.png";
import LuizaBubatuAvatar from "../../assets/img/jury/luiza_bubatu.png";
import RazvanDeaconescuAvatar from "../../assets/img/jury/razvan_deaconescu.png";
import JulianAvatar from "../../assets/img/jury/julian_atanasoae.png";
import AndreiMAvatar from "../../assets/img/jury/andrei_munteanu.png";
import AlexCiteaAvatar from "../../assets/img/jury/alex_citea.png";
import AlexComanAvatar from "../../assets/img/jury/alex_coman.png";

import DefaultAvatar from "../../assets/img/jury/default.png";
import DefaultDocument from "../../assets/img/icons/doc.png";

import UtilityPDF from "../../assets/static/utility.pdf";
import EducationalPDF from "../../assets/static/educational.pdf";
import WebPDF from "../../assets/static/web.pdf";
import MediaPDF from "../../assets/static/media.pdf";
import MobilePDF from "../../assets/static/mobile.pdf";
import RobotsPDF from "../../assets/static/robots.pdf";


export default React.createClass({
  displayName: "Jury",
  render() {

    var educational = [
        {"avatar": DefaultAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul National 'Aurel Vlaicu' Orastie"},
        {"avatar": RazvanDeaconescuAvatar, "name": "Razvan Deaconescu", "occupation": "Sef lucrari @ Universitatea 'Politehnica' Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Ovidiu Rosca", "occupation": "Profesor @ Liceul 'Dragos Voda' Sighetu Marmatiei"},
        {"avatar": DefaultAvatar, "name": "Emilian Bacila", "occupation": "student @ University of Cambridge"},
        {"avatar": AndreiMAvatar, "name": "Andrei Munteanu", "occupation": "student @ University of Manchester"},
        {"avatar": JulianAvatar, "name": "Iulian Atanasoaie", "occupation": "student @ Facultatea de Matematică și Informatică din București"}
    ];
    var media = [
        {"avatar": DefaultAvatar, "name": "Florentina Hora", "occupation": "Profesor @ Colegiul National 'Samuil Vulcan' Beius"},
        {"avatar": DefaultAvatar, "name": "Andreea Popescu", "occupation": "QA Engineer @ Zitec"},
        {"avatar": RobertaTomegaAvatar, "name": "Roberta Tomega", "occupation": "studenta @ Universitatea Politehnica Timișoara"},
        {"avatar": LuizaBubatuAvatar, "name": "Luiza Bubatu", "occupation": "studenta @ Universitatea Tehnică Cluj-Napoca"},
        {"avatar": DefaultAvatar, "name": "Carmen Lascoiu", "occupation": "studenta @ Universitatea Națională de Arte Teatrale 'I. L. Caragiale' București"}
    ];
    var robots = [
        {"avatar": DefaultAvatar, "name": "Ovidiu Domsa", "occupation": "Profesor @ Universitatea '1 Decembrie' Alba Iulia"},
        {"avatar": DefaultAvatar, "name": "Maria Stan", "occupation": "Profesor @ Colegiul Tehnic 'Radu Negru' Galati"},
        {"avatar": DefaultAvatar, "name": "Rodica Pintea", "occupation": "Profesor @ Liceul 'Grigore Moisil' Bucureşti"},
        {"avatar": DefaultAvatar, "name": "Ovidiu Tirian", "occupation": "Sef lucrari @ Universitatea Politehnică Timișoara - Inginerie Hunedoara"},
        {"avatar": DefaultAvatar, "name": "Mircea Bratan", "occupation": "Inginer Software @ Tremend Software Consulting"}
    ];
    var utilitar = [
        {"avatar": DefaultAvatar, "name": "Spatarel Dan", "occupation": "Profesor @ Colegiul National Tudor Vianu Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Claudiua Buran", "occupation": "Profesor @ Colegiul National Samuil Vulcan Beius, jud. Bihor"},
        {"avatar": AlexCiteaAvatar, "name": "Alex Vasile Iosif Citea", "occupation": "Malware Analyst @ Bitdefender"},
        {"avatar": AlexComanAvatar, "name": "Alexandru Coman", "occupation": "Cloud Engineer  @ Cloudbase"},
        {"avatar": VladAvatar, "name": "Vlad Temian", "occupation": "Software Developer @ Presslabs"},
        {"avatar": DefaultAvatar, "name": "Alexandru Buicescu", "occupation": "Inginer Software @ Indycoding"}
    ];
    var web = [
        {"avatar": DefaultAvatar, "name": "Narcisa Dima", "occupation": "Profesor @ Liceul 'Ion Barbu' Pitesti"},
        {"avatar": DefaultAvatar, "name": "Istrate Nicolae", "occupation": "Profesor @ Colegiul National 'Ienachita Vacarescu' din Targoviste"},
        {"avatar": AndreiAAvatar, "name": "Andrei Adoamnei", "occupation": "Head of Development @ Conversion Network LLC"},
        {"avatar": DefaultAvatar, "name": "Robert Dolca", "occupation": "Inginer Software @ Intel"},
        {"avatar": AlexPAvatar, "name": "Alex Palcuie", "occupation": "Referent @ Cancelaria Prim-Ministrului"},
        {"avatar": SabinMarcuAvatar, "name": "Sabin Marcu", "occupation": "student @ University of Southampton"}
    ];

    var criteria = [
      {"name": "Educațional", "file": EducationalPDF},
      {"name": "Multimedia", "file": MediaPDF},
      {"name": "Mobile", "file": MobilePDF},
      {"name": "Roboți", "file": RobotsPDF},
      {"name": "Utilitar", "file": UtilityPDF},
      {"name": "Web", "file": WebPDF}
    ];

    return <div className="jury">
        <div className="blue-section-wrapper">
          <Grid className="blue-section">
            <Header isLoggedIn={this.props.isLoggedIn} />
            <Row>
              <Col>
                <h1>Juriul InfoEduca&#355;ie</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Membrii juriului pe categorii</h2>
              </Col>
            </Row>
          </Grid>
        </div>

        <Grid>
          <JuryDescription iconClass="section-icon educational" name="educațional" members={educational}/>
          <JuryDescription iconClass="section-icon media" name="multimedia" members={media}/>
          <JuryDescription iconClass="section-icon robots" name="roboți" members={robots}/>
          <JuryDescription iconClass="section-icon utility" name="utilitar" members={utilitar}/>
          <JuryDescription iconClass="section-icon web" name="web" members={web}/>
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
                      <div className="jury-criteria-img">
                        <Link to="static-pdf">sdasd</Link>
                      </div>
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
