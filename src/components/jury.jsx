"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import gravatar from "../lib/gravatar";
import AlexandruIonascu from "../../assets/img/jury/Alexandru_Ionascu.jpg";
import RobertColca from "../../assets/img/jury/Robert_Colca.jpg";
import StefanDinescu from "../../assets/img/jury/Stefan_Dinescu.jpg";
import MichaelTrett from "../../assets/img/jury/Michael_Trett.jpg";
import StefanMunteanu from "../../assets/img/jury/Stefan_Munteanu.png";
import AndreiCasuneanu from "../../assets/img/jury/Andrei_Casuneanu.jpg";
import DariusCostolos from "../../assets/img/jury/Darius_Costolos.jpg";
//import bogdan_bocse from "../../assets/img/jury/bogdan_bocse.jpg";
import AlexandruAvatar from "../../assets/img/jury/alexandru_cristian.jpg";
import CezarAvatar from "../../assets/img/jury/cezar_andrici.jpg";
import CasianAvatar from "../../assets/img/jury/casian_lacatusu.jpg";
import CatalinAvatar from "../../assets/img/jury/catalin_stoian.jpg";
import DanielPopaAvatar from "../../assets/img/jury/daniel_popa.jpg";
import DanSpatarelAvatar from "../../assets/img/jury/dan_spatarel.jpg";
import DomsaAvatar from "../../assets/img/jury/domsa_ovidiu.jpg";
import EmilOneaAvatar from "../../assets/img/jury/emil_onea.jpg";
import ErvinAvatar from "../../assets/img/jury/ervin_szabo.jpg";
import FasanAvatar from "../../assets/img/jury/fasan_mihail.jpg";
import MihaiAgapeAvatar from "../../assets/img/jury/mihai_agape.jpg";
import MarilenaAvatar from "../../assets/img/jury/marilena_oprea.jpg";
import PetruAvatar from "../../assets/img/jury/petru_dimitriu.jpg";
import RazvanDeaconescuAvatar from "../../assets/img/jury/razvan_deaconescu.jpg";
//import RodicaPinteaAvatar from "../../assets/img/jury/rodica_pintea.jpg";
import StefanAvatar from "../../assets/img/jury/stefan_stolniceanu.jpg";
//import StelianNiculescuAvatar from "../../assets/img/jury/stelian_niculescu.jpg";
import ValerAvatar from "../../assets/img/jury/valer_szabo.jpg";
import VladAvatar from "../../assets/img/jury/vlad_durnea.jpg";
import DefaultAvatar from "../../assets/img/jury/default.png";
import DefaultDocument from "../../assets/img/icons/doc.png";
//import RughinisAvatar from "../../assets/img/jury/razvanrughinis.jpg";


export default React.createClass({
  displayName: "Jury",
  render() {
    let presedinte = [
    {"avatar": DomsaAvatar, "name": "dr. Ovidiu  Domșa", "occupation": "Profesor @Universitatea \"1 Decembrie\" Alba Iulia"},
    ];

    let presedinteExecutiv = [
      {"avatar": DefaultAvatar, "name": "Cornelia Neacșu", "occupation": "Colegiul National Unirea"}
      //{"avatar": MarilenaAvatar, "name": "Marilena Oprea", "occupation": "I.S.J. Vrancea"}
    ];
  //  let presedinteOnorific = [

  //    {"avatar": StelianNiculescuAvatar, "name": "Stelian Niculescu", "occupation": ""}
//    ];

    let secretar = [
      {"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "Școala Nr.5 Focșani"}
      //  {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul National 'Aurel Vlaicu' Orastie"}
    ];

    let comisiaTehnica = [
      {"avatar": EmilOneaAvatar, "name": "Emil Onea", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      {"avatar": DefaultAvatar, "name": "Dan Roșioru", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      //{"avatar": DefaultAvatar, "name": "Daniel Gherasim", "occupation": "Profesor la CCD Vrancea"},
      //{"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "Profesor @ Școala Nr.5 Focșani"}

    ];

    var educational = [
        {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Liceul Teoretic 'Aurel Vlaicu' Orastie"},
        //{"avatar": DomsaAvatar, "name": "Domșa Ovidiu", "occupation": "Lector la Universitatea 1 Decembrie Alba Iulia"},
        {"avatar": PetruAvatar, "name": "Petru Dimitriu", "occupation": "Student la Universitatea Tehnică Gheroghe Asachi din Iași, Facultatea de Automatică și Calculatoare"},
        {"avatar": DefaultAvatar, "name": "Arișanu Ana-Maria", "occupation": "Profesor @ Colegiul National Mircea cel Batran Rm. Valcea "},
        {"avatar": DefaultAvatar, "name": "Roxana Tâmplaru", "occupation": "Profesor @ Colegiul „Stefan Odobleja” Craiova"},
        {"avatar": DefaultAvatar, "name": "Narcisa Dima", "occupation": "Profesor @ Liceul Teoretic Ion Barbu, Pitesti"},
        {"avatar": DefaultAvatar, "name": "Nechita Ionuț", "occupation": "Facultatea de Calculatoare, Automatică și Inginerie Electrică Galați"},

    ];
    var media = [
        {"avatar": DefaultAvatar, "name": "Cătălina Burlacu", "occupation": "Profesor @ Colegiul Dunărea Galaţi"},
        {"avatar": DefaultAvatar, "name": "Liliana Nesu", "occupation": "Profesor @ Colegiul National Unirea din Focsani"},
        {"avatar": DefaultAvatar, "name": "Nechita Ionuț", "occupation": "Student la Facultatea de Calculatoare, Automatica si Inginerie Electrica Galati"},
        {"avatar": DefaultAvatar, "name": "Catalin Daniel Anghel", "occupation": "Universitatea Spiru Haret București"},
        {"avatar": DefaultAvatar, "name": "Antonia Haller", "occupation": "Profesor @ CN Mircea cel Batran, Rm. Valcea"},
        {"avatar": DefaultAvatar, "name": "Alexandru Vulpescu", "occupation": "Universitatea Spiru Haret București"},
        {"avatar": DefaultAvatar, "name": "Coralia Bodea", "occupation": "Universitatea Politehnica Timisoara"},
        {"avatar": DefaultAvatar, "name": "Coșniță Elena", "occupation": "Profesor @ Liceul Teoretic Miron Costin Pascani"}

    ];
    var robots = [
        //{"avatar": MihaiAgapeAvatar, "name": "Mihai Agape", "occupation": "Profesor @ Palatul Copiilor Drobeta Turnu Severin, Filiala Orșova"},
        {"avatar": DefaultAvatar, "name": "Laviniu Bejenaru", "occupation": "Profesor @ Colegiul National 'Traian' din Drobeta Turnu Severin"},
        {"avatar": DefaultAvatar, "name": "Marian Stoica", "occupation": "Student la FMI Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Stan Maria", "occupation": "Profesor @ Colegiul Tehnic Radu Negru Galaţi"},
        {"avatar": DefaultAvatar, "name": "Preda Robert", "occupation": "Universitatea Politehnică Timișoara"},
        {"avatar": DefaultAvatar, "name": "Carmen Bardita", "occupation": "Profesor @ Liceul Teoretic Stefan Procopiu Vaslui"},
        {"avatar": DefaultAvatar, "name": "Ciobanu Laurențiu", "occupation": "Universitatea Transilvania Brasov"},
        {"avatar": DefaultAvatar, "name": "Dimitrie Filip", "occupation": "Colegiul Național \"Nicu Gane\" Fălticeni"},
        {"avatar": DefaultAvatar, "name": "Marius Crainic", "occupation": "Colegiul ”Mihai Viteazul” Ineu"},

    ];
    var utilitar = [
        {"avatar": DefaultAvatar, "name": "Cristina Anton", "occupation": "CCD Brăila"},
        //{"avatar": RazvanDeaconescuAvatar, "name": "Răzvan Deaconescu", "occupation": "Șef lucrări @ Universitatea Politehnică din București"},
        {"avatar": DefaultAvatar, "name": "Bibicu Dorin", "occupation": "Profesor @ Liceul Teoretic Dunărea Galaţi"},
        {"avatar": DefaultAvatar, "name": "Valentin Mocanu", "occupation": "Student la Universitatea Politehnica din Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Penu Ionela", "occupation": "Profesor @ Scoala Gimnazială Miron Costin Galați"},
        {"avatar": DefaultAvatar, "name": "Salajan Romana", "occupation": "Liceul National de Informatica Arad"},
        {"avatar": DefaultAvatar, "name": "Edvin Mako", "occupation": "Slovak University of Technology, Vanilla Apps"},
        {"avatar": DefaultAvatar, "name": "Luca Sas", "occupation": "Student la University Of Leeds"},
        {"avatar": DefaultAvatar, "name": "Denis Troncotă", "occupation": "Universitatea Politehnica Timișoara, Transylvania High Tech"},

    ];
    var web = [
        {"avatar": DefaultAvatar, "name": "Chereș Adriana", "occupation": "Profesor @ Liceul Teoretic Nicolae Bălcescu Cluj Napoca"},
        {"avatar": DefaultAvatar, "name": "Carmocanu Gheorghe", "occupation": "Profesor @ Liceul Teoretic Nicolae Iorga Botoşani"},
        {"avatar": RobertColca, "name": "Robert Mihai Colca ", "occupation": "Student la Universitatea de Vest din Timișoara, Amazon"},
        {"avatar": DefaultAvatar, "name": "Cristian Dumitrov", "occupation": "Facultatea de Matematică și Informatică București"},
        {"avatar": StefanAvatar, "name": "Stefan Stolniceanu ", "occupation": "Student la Facultatea de Informatica, Universitatea „Alexandru Ioan Cuza”  "},
        {"avatar": DefaultAvatar, "name": "Laurențiu Ciobanu", "occupation": "Student la Universitatea Transilvania din Brasov, FintechOS"},
        {"avatar": DefaultAvatar, "name": "Ștefănucă Alin", "occupation": "Profesor @ Liceul \"Dimitrie Cantemir\" Darabani"},
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
            <JuryDescription name="președinte" members={presedinte}/>
            <JuryDescription name="președinte executiv" members={presedinteExecutiv}/>

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
