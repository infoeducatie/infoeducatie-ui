"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import gravatar from "../lib/gravatar";
import RobertColca from "../../assets/img/jury/Robert_Colca.jpg";
import DumitrascuAlina from "../../assets/img/jury/dumitrascualina.png";
//import bogdan_bocse from "../../assets/img/jury/bogdan_bocse.jpg";
import AntoniaHaller from "../../assets/img/jury/antoniahaller.jpg";
import Carmocanu from "../../assets/img/jury/carmocanu.jpg";
import Centa from "../../assets/img/jury/centa.png";
import Arisanu from "../../assets/img/jury/arisanu.png";
import DanielPopaAvatar from "../../assets/img/jury/daniel_popa.jpg";
import DanSpatarelAvatar from "../../assets/img/jury/dan_spatarel.jpg";
import DomsaAvatar from "../../assets/img/jury/domsa_ovidiu.jpg";
import EmilOneaAvatar from "../../assets/img/jury/emil_onea.jpg";
import LaviniuBejenaru from "../../assets/img/jury/laviniubejenaru.png";
//import FasanAvatar from "../../assets/img/jury/fasan_mihail.jpg";
//import MihaiAgapeAvatar from "../../assets/img/jury/mihai_agape.jpg";
import MarilenaAvatar from "../../assets/img/jury/marilena_oprea.jpg";
import PetruAvatar from "../../assets/img/jury/petru_dimitriu.jpg";
import RazvanDeaconescuAvatar from "../../assets/img/jury/razvan_deaconescu.jpg";
//import RodicaPinteaAvatar from "../../assets/img/jury/rodica_pintea.jpg";
import StefanAvatar from "../../assets/img/jury/stefan_stolniceanu.jpg";
//import StelianNiculescuAvatar from "../../assets/img/jury/stelian_niculescu.jpg";
import AdrianaCheres from "../../assets/img/jury/adrianacheres.jpg";
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
{"avatar": Centa, "name": "Cența Mariana Răvaș         ", "occupation": "inspector informatică @ ISJ Vrancea"}
    ];

    let vicepresedinte = [
    {"avatar": DumitrascuAlina, "name": "Prof. Dumitrașcu Alina", "occupation": "Consilier @  Ministerul Educației"},
    ];

    let secretar = [
      {"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "profesor @ Școala Gimnazială 'Anghel Saligny' Focșani"}
      //  {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul National 'Aurel Vlaicu' Orastie"}
    ];

    let comisiaTehnica = [
      {"avatar": EmilOneaAvatar, "name": "Emil Onea", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      {"avatar": DefaultAvatar, "name": "Dan Roșioru", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      {"avatar": DomsaAvatar, "name": "Ovidiu Domșa", "occupation": "Profesor @ Univ. Alba Iulia"},
      {"avatar": DefaultAvatar, "name": "Monica Chiriță", "occupation": "Profesor @ Colegiul National Unirea"}

    ];

    var educational = [

        //
        {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Liceul Teoretic 'Aurel Vlaicu' Orastie"},
        {"avatar": PetruAvatar, "name": "Petru Dimitriu", "occupation": "Asistent la Universitatea Tehnică 'Gh. Asachi' din Iași"},
        {"avatar": DefaultAvatar, "name": "Matei Adriel Rafael", "occupation": "University of Groningen"},
        {"avatar": DefaultAvatar, "name": "Ebru Resul", "occupation": "security engineer @ Keysight Technologies"},
        {"avatar": AntoniaHaller, "name": "Antonia Haller", "occupation": "Profesor @ Colegiul National 'Mircea cel Batran' Rm. Valcea "},
        {"avatar": DefaultAvatar, "name": "Bogdan Patrut", "occupation": "Profesor @ Unuiversitatea Alexandru Ioan Cuza Iasi"},
        {"avatar": DefaultAvatar, "name": "Enescu Catalina", "occupation": "Profesor @ Liceul Teoretic Ion Cantacuzino"},
        {"avatar": Arisanu, "name": "Arișanu Ana-Maria", "occupation": "Profesor @ Colegiul National 'Mircea cel Batran' Rm. Valcea "},

    ];
    var media = [
        {"avatar": DefaultAvatar, "name": "Burlacu Cătălina", "occupation": "Profesor @ Colegiul Dunărea Galaţi"},
        {"avatar": DefaultAvatar, "name": "Negru Alexandru", "occupation": "Universitatea Babeș-Bolyai"},
        {"avatar": DefaultAvatar, "name": "Roxana Tîmplaru", "occupation": "Profesor @ Colegiul Național 'Ștefan Odobleja'"},
        {"avatar": DefaultAvatar, "name": "Anghel Cătălin Daniel", "occupation": "inginer @ Amber Studio Romania"},
        {"avatar": DefaultAvatar, "name": "Vulpescu Alexandru", "occupation": "inginer @ Amber Studio Romania"},
        {"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "profesor @ Școala Gimnazială 'Anghel Saligny' Focșani"},
        {"avatar": DefaultAvatar, "name": "Munteanu Ana", "occupation": "UNATC"},
        {"avatar": DefaultAvatar, "name": "Penu Ionela Mihaela", "occupation": "profesor @ Școala Miron Costin Galati"}


    ];
    var robots = [
        {"avatar": DefaultAvatar, "name": "Tătaru Daniela Ioana", "occupation": "Profesor @ Colegiul Național 'Alexandru Dimitrie Ghica' Alexandria"},
        {"avatar": DefaultAvatar, "name": "Gorea Zamfir Claudiu", "occupation": "Profesor @ Liceul Teoretic 'Miron Costin' Iasi"},
        {"avatar": DefaultAvatar, "name": "Preda Robert", "occupation": "ML Researcher @ Everseen Ltd."},
        {"avatar": LaviniuBejenaru, "name": "Laviniu Bejenaru", "occupation": "Profesor @ Colegiul National 'Traian' din Drobeta Turnu Severin"},
        {"avatar": DefaultAvatar, "name": "Marian Crăciun", "occupation": "inginer @ IV FUTURE"},
        {"avatar": DefaultAvatar, "name": "Stan Maria", "occupation": "Profesor @ Colegiul Tehnic Radu Negru Galaţi"},
    ];
    var utilitar = [
        {"avatar": RazvanDeaconescuAvatar, "name": "Răzvan Deaconescu", "occupation": "Șef lucrări @ Universitatea Politehnică din București"},
        {"avatar": DefaultAvatar, "name": "Denis Troncotă", "occupation": "inginer @ Transylvania High Tech"},
        {"avatar": DefaultAvatar, "name": "Luca Sas", "occupation": "Core Systems Engineer @ Creative Assembly"},
        {"avatar": DefaultAvatar, "name": "Vasilache Cristian", "occupation": "Universitatea Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Cosmin Ciolacu", "occupation": " inginer @ Hodlezz"},
        {"avatar": DefaultAvatar, "name": "Tudor-Ioan Roman", "occupation": " Vrije Universiteit Amsterdam"},
        {"avatar": DefaultAvatar, "name": "Ciprian Ionescu", "occupation": " Delft University of Technology"},
        {"avatar": DefaultAvatar, "name": "George Dragomir", "occupation": " Vrije Universiteit Amsterdam"},
        {"avatar": DefaultAvatar, "name": "Simion Strugar", "occupation": " profesor @ Colegiul National „George Cosbuc” Nasaud"},
        {"avatar": DefaultAvatar, "name": "Cristina Anton", "occupation": " profesor @ CCD Brăila"}

    ];
    var web = [
        {"avatar": AdrianaCheres, "name": "Chereș Adriana", "occupation": "Profesor @ Liceul Teoretic Nicolae Bălcescu Cluj Napoca"},
        {"avatar": DefaultAvatar, "name": "Vrînceanu Radu", "occupation": "FMI - Universitatea din București"},
        {"avatar": RobertColca, "name": "Colca Robert Mihai", "occupation": "Software Development Engineer"},
        {"avatar": DefaultAvatar, "name": "Alexandru Botici", "occupation": "Software Development Engineer"},
        {"avatar": DefaultAvatar, "name": "Muntean Rareș Mircea", "occupation": "Profesor @ Liceul Teoretic 'Emil Racoviță' Baia-Mare"},
        {"avatar": Carmocanu, "name": "Carmocanu Gheorghe", "occupation": "Profesor @ Liceul Teoretic Nicolae Iorga Botoşani"},
        {"avatar": DefaultAvatar, "name": "Novac Dan Andrei", "occupation": "inginer @ emag"},
        {"avatar": DefaultAvatar, "name": "Emanuel Covaci", "occupation": "inginer @ Porsche Engineering"},
        {"avatar": DefaultAvatar, "name": "Anatol Dragan", "occupation": "inginer @ Tazz"},
        {"avatar": DefaultAvatar, "name": "Flavia Oprea", "occupation": "Universitatea Politehnica Bucuresti"},
        {"avatar": DefaultAvatar, "name": "Bibicu Dorin", "occupation": "Profesor @ Liceul Teoretic 'Dunarea' Galati"},
        {"avatar": DefaultAvatar, "name": "Andreea Popescu", "occupation": "inginer @ Analog Devices"},
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
            <JuryDescription name="vicepreședinte" members={presedinteExecutiv}/>
            <JuryDescription name="vicepreședinte" members={presedinteOnorific}/>
            <JuryDescription name="vicepreședinte" members={vicepresedinte}/>
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
