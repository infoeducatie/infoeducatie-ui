"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury-description";

import "./jury.less";

import VladAvatar from "../../assets/img/jury/vlad_temian.png";
import RobertAvatar from "../../assets/img/jury/robert_dolca.png";
import AlexPAvatar from "../../assets/img/jury/alex_palcuie.png";
import AndreiAAvatar from "../../assets/img/jury/andrei_adoamnei.png";
import SabinMarcuAvatar from "../../assets/img/jury/sabin_marcu.png";
import RobertaTomegaAvatar from "../../assets/img/jury/roberta_tomega.png";
import RazvanDeaconescuAvatar from "../../assets/img/jury/razvan_deaconescu.png";
import JulianAvatar from "../../assets/img/jury/julian_atanasoae.png";
import AndreiMAvatar from "../../assets/img/jury/andrei_muntean.png";
import AlexCiteaAvatar from "../../assets/img/jury/alex_citea.png";
import AlexComanAvatar from "../../assets/img/jury/alex_coman.png";

import DefaultAvatar from "../../assets/img/jury/default.png";
import DefaultDocument from "../../assets/img/icons/doc.png";


export default React.createClass({
  displayName: "Jury",
  render() {

    var educational = [
        {"avatar": DefaultAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul National 'Aurel Vlaicu' Orastie"},
        {"avatar": RazvanDeaconescuAvatar, "name": "Răzvan Deaconescu", "occupation": "Sef lucrari @ Universitatea 'Politehnica' Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Ovidiu Roșca", "occupation": "Profesor @ Liceul 'Dragos Voda' Sighetu Marmatiei"},
        {"avatar": DefaultAvatar, "name": "Emilian Bacila", "occupation": "student @ University of Cambridge"},
        {"avatar": AndreiMAvatar, "name": "Andrei Muntean", "occupation": "student @ University of Manchester"},
        {"avatar": JulianAvatar, "name": "Iulian Atănăsoae", "occupation": "student @ Facultatea de Matematică și Informatică din București"}
    ];
    var media = [
        {"avatar": DefaultAvatar, "name": "Florentina Hora", "occupation": "Profesor @ Colegiul National 'Samuil Vulcan' Beius"},
        {"avatar": DefaultAvatar, "name": "Andreea Popescu", "occupation": "QA Engineer @ Zitec"},
        {"avatar": RobertaTomegaAvatar, "name": "Roberta Tomegea", "occupation": "studenta @ Universitatea Politehnica Timișoara"},
        {"avatar": DefaultAvatar, "name": "Luiza Bubatu", "occupation": "studenta @ Universitatea Tehnică Cluj-Napoca"},
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
        {"avatar": DefaultAvatar, "name": "Spătărel Dan", "occupation": "Profesor @ Colegiul National Tudor Vianu Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Claudia Buran", "occupation": "Profesor @ Colegiul National Samuil Vulcan Beius, jud. Bihor"},
        {"avatar": AlexCiteaAvatar, "name": "Alexandru Cîtea", "occupation": "Malware Analyst @ Bitdefender"},
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
      {"name": "Educațional", "link": "https://docs.google.com/document/d/10ygW8gpijQJE94CbMMNxhrt_ju3X-tMjPATf7WcjTW8/pub"},
      {"name": "Multimedia", "link": "https://docs.google.com/document/d/12UY9ByKQt7CpBj11vwg1HPrsKOH-uTL9kFCEdxBgvAY/pub"},
      {"name": "Mobile", "link": "https://docs.google.com/document/d/1jqwoAduZoHjnj01Q6eQE0DWNB-DeMQouLumkW753mUA/pub"},
      {"name": "Roboți", "link": "https://docs.google.com/document/d/1n0yoqA3n9heBiYWgmeg-lfXYPvSMVMRhGZrHRYKhDVk/pub"},
      {"name": "Utilitar", "link": "https://docs.google.com/document/d/19HTucZgQWY92nZ-NDoKRWlE63hipb_IkZVcMxHyOCdc/pub"},
      {"name": "Web", "link": "https://docs.google.com/document/d/1ZgdZz_5JHJSZyxWnZWzP162NZ2H3CkBojyp5p6cKNDI/pub"}
    ];

    return <div className="jury">
        <div className="blue-section-wrapper">
          <Grid className="blue-section">
            <Header isLoggedIn={this.props.isLoggedIn}
                    login={this.props.login}
                    logout={this.props.logout} />
            <Row>
              <Col xs={12}>
                <h1>Juriul InfoEduca&#355;ie <br />
                    Ediția {this.props.current.edition.year}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h2>Membrii juriului pe categorii</h2>
              </Col>
            </Row>
          </Grid>
        </div>

        <Grid>
          <JuryDescription iconClass="section-icon educational" name="educațional" members={educational}/>
          <JuryDescription iconClass="section-icon multimedia" name="multimedia" members={media}/>
          <JuryDescription iconClass="section-icon roboti" name="roboți" members={robots}/>
          <JuryDescription iconClass="section-icon utilitar" name="utilitar" members={utilitar}/>
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
