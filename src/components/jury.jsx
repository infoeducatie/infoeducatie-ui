"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import gravatar from "../lib/gravatar";
//import AlexandruIonascu from "../../assets/img/jury/Alexandru_Ionascu.jpg";
import RobertColca from "../../assets/img/jury/Robert_Colca.jpg";
//import StefanDinescu from "../../assets/img/jury/Stefan_Dinescu.jpg";
//import StefanMunteanu from "../../assets/img/jury/Stefan_Munteanu.png";
//import AndreiCasuneanu from "../../assets/img/jury/Andrei_Casuneanu.jpg";
//import DariusCostolos from "../../assets/img/jury/Darius_Costolos.jpg";
//import bogdan_bocse from "../../assets/img/jury/bogdan_bocse.jpg";
import AlexandruAvatar from "../../assets/img/jury/alexandru_cristian.jpg";
import CezarAvatar from "../../assets/img/jury/cezar_andrici.jpg";
//import CasianAvatar from "../../assets/img/jury/casian_lacatusu.jpg";
import CatalinAvatar from "../../assets/img/jury/catalin_stoian.jpg";
import DanielPopaAvatar from "../../assets/img/jury/daniel_popa.jpg";
import DanSpatarelAvatar from "../../assets/img/jury/dan_spatarel.jpg";
import DomsaAvatar from "../../assets/img/jury/domsa_ovidiu.jpg";
import EmilOneaAvatar from "../../assets/img/jury/emil_onea.jpg";
//import ErvinAvatar from "../../assets/img/jury/ervin_szabo.jpg";
import FasanAvatar from "../../assets/img/jury/fasan_mihail.jpg";
//import MihaiAgapeAvatar from "../../assets/img/jury/mihai_agape.jpg";
import MarilenaAvatar from "../../assets/img/jury/marilena_oprea.jpg";
import PetruAvatar from "../../assets/img/jury/petru_dimitriu.jpg";
import RazvanDeaconescuAvatar from "../../assets/img/jury/razvan_deaconescu.jpg";
//import RodicaPinteaAvatar from "../../assets/img/jury/rodica_pintea.jpg";
import StefanAvatar from "../../assets/img/jury/stefan_stolniceanu.jpg";
//import StelianNiculescuAvatar from "../../assets/img/jury/stelian_niculescu.jpg";
//import ValerAvatar from "../../assets/img/jury/valer_szabo.jpg";
//import VladAvatar from "../../assets/img/jury/vlad_durnea.jpg";
import DefaultAvatar from "../../assets/img/jury/default.png";
import DefaultDocument from "../../assets/img/icons/doc.png";
import RughinisAvatar from "../../assets/img/jury/razvanrughinis.jpg";


export default React.createClass({
  displayName: "Jury",
  render() {
    let presedinte = [
    {"avatar": RughinisAvatar, "name": "Prof. Dr. Ing. Răzvan Rughiniș", "occupation": "Prodecan @ Universitatea Politehnică București"},
    ];

    let presedinteExecutiv = [
{"avatar": DefaultAvatar, "name": "   Daniel Gherasim                  ", "occupation": "inspector gen. adj. @ ISJ Vrancea"}
      //{"avatar": MarilenaAvatar, "name": "Marilena Oprea", "occupation": "I.S.J. Vrancea"}
    ];
    let presedinteOnorific = [
{"avatar": DefaultAvatar, "name": "Cența Mariana Răvaș         ", "occupation": "inspector informatică @ ISJ Vrancea"}

    ];

    let secretar = [
      {"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "profesor @ Școala Gimnazială 'Anghel Saligny' Focșani"}
      //  {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul National 'Aurel Vlaicu' Orastie"}
    ];

    let comisiaTehnica = [
      {"avatar": EmilOneaAvatar, "name": "Emil Onea", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      {"avatar": DefaultAvatar, "name": "Dan Roșioru", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      //
      //{"avatar": DefaultAvatar, "name": "Daniel Gherasim", "occupation": "Profesor la CCD Vrancea"},
      //{"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "Profesor @ Școala Nr.5 Focșani"}

    ];

    var educational = [

        //
        {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Liceul Teoretic 'Aurel Vlaicu' Orastie"},
        {"avatar": PetruAvatar, "name": "Petru Dimitriu", "occupation": "Asistent la Universitatea Tehnică 'Gh. Asachi' din Iași"},
        {"avatar": DefaultAvatar, "name": "Ciaușu Nicoleta", "occupation": "Studentă @ FMI - Universitatea din București"},
        {"avatar": DefaultAvatar, "name": "Ebru Resul", "occupation": "security engineer @ Keysight Technologies"},
        {"avatar": DefaultAvatar, "name": "Bodis Klara", "occupation": "Profesor @ Liceul Teologic Reformat 'Wesselenyi' Zalău"},
        {"avatar": DefaultAvatar, "name": "Andreescu Cristina", "occupation": "Profesor @ Liceul Tehnologic 'Nikola Tesla' București"},
        {"avatar": DefaultAvatar, "name": "Simion Strugar", "occupation": "Profesor @ Colegiul Național George Coșbuc"},
        {"avatar": DefaultAvatar, "name": "Bibicu Dorin", "occupation": "Profesor @ Liceul Teoretic 'Dunărea' Galați"},
        {"avatar": DefaultAvatar, "name": "Arișanu Ana-Maria", "occupation": "Profesor @ Colegiul National 'Mircea cel Batran' Rm. Valcea "},
        {"avatar": DefaultAvatar, "name": "Nechita Ionuț", "occupation": "SC INTEL SOFTWARE DEVELOPEMENT SRL"},

    ];
    var media = [
        {"avatar": DefaultAvatar, "name": "Burlacu Cătălina Mercedes", "occupation": "Profesor @ Colegiul Dunărea Galaţi"},
        {"avatar": DefaultAvatar, "name": "Daniel Gherasim", "occupation": "inspector gen. adj. @ ISJ Vrancea"},
        {"avatar": DefaultAvatar, "name": "Anghel Cătălin Daniel", "occupation": "inginer @ Amber Studio Romania"},
        {"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "profesor @ Școala Gimnazială 'Anghel Saligny' Focșani"},
        {"avatar": DefaultAvatar, "name": "Negru Alexandru", "occupation": "student @ Universitatea Babeș-Bolyai"},
      //  {"avatar": DefaultAvatar, "name": "Antonia Haller", "occupation": "Profesor @ CN Mircea cel Batran, Rm. Valcea"},

    ];
    var robots = [
        {"avatar": DefaultAvatar, "name": "Tătaru Daniela Ioana", "occupation": "Profesor @ Colegiul Național 'Alexandru Dimitrie Ghica' Alexandria"},
        {"avatar": DefaultAvatar, "name": "Preda Robert", "occupation": "ML Researcher @ Everseen Ltd."},
        //{"avatar": DefaultAvatar, "name": "Laviniu Bejenaru", "occupation": "Profesor @ Colegiul National 'Traian' din Drobeta Turnu Severin"},
        {"avatar": DefaultAvatar, "name": "Marian Stoica", "occupation": "inginer @ Luxoft Proffesional Romania SRL"},
        {"avatar": DefaultAvatar, "name": "Stan Maria", "occupation": "Profesor @ Colegiul Tehnic Radu Negru Galaţi"},
    ];
    var utilitar = [
        {"avatar": RazvanDeaconescuAvatar, "name": "Răzvan Deaconescu", "occupation": "Șef lucrări @ Universitatea Politehnică din București"},
        {"avatar": DefaultAvatar, "name": "Denis Troncotă", "occupation": "inginer @ Devplant SRL"},
        {"avatar": DefaultAvatar, "name": "Luca Sas", "occupation": "Core Systems Engineer @ Creative Assembly"},
        {"avatar": DefaultAvatar, "name": "Vasilache Cristian", "occupation": "student @ Universitatea Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Alexandru Iulian Magan", "occupation": "Student @ University of Leeds"},

    ];
    var web = [
        {"avatar": DefaultAvatar, "name": "Chereș Adriana", "occupation": "Profesor @ Liceul Teoretic Nicolae Bălcescu Cluj Napoca"},
        {"avatar": DefaultAvatar, "name": "Dinu Ștefan Rusu", "occupation": "student @ Universitatea Politehnica București"},

        {"avatar": DefaultAvatar, "name": "Alexandru Botici", "occupation": "Software Development Engineer"},
        {"avatar": DefaultAvatar, "name": "Cosmin Ciolacu", "occupation": "Back-End Web Developer @ DEV51"},
        {"avatar": DefaultAvatar, "name": "Antonia Haller", "occupation": "Profesor @ Colegiul Național 'Mircea cel Bătrân' Râmnicu Vâlcea"},
        {"avatar": DefaultAvatar, "name": "Muntean Rareș Mircea", "occupation": "Profesor @ Liceul Teoretic 'Emil Racoviță' Baia-Mare"},
        {"avatar": RobertColca, "name": "Colca Robert Mihai", "occupation": "Software Development Engineer"},
        {"avatar": DefaultAvatar, "name": "Carmocanu Gheorghe", "occupation": "Profesor @ Liceul Teoretic Nicolae Iorga Botoşani"},
        {"avatar": DefaultAvatar, "name": "Vrînceanu Radu Tudor", "occupation": "Student @ FMI - Universitatea din București"},
        {"avatar": DefaultAvatar, "name": "Voinea Mihai Alexandru", "occupation": "Student @ FMI - Universitatea din București"},
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
            <JuryDescription name="președinte onorific" members={presedinteOnorific}/>
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
          <Row>
            <JuryDescription name="secretar" members={secretar}/>
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
