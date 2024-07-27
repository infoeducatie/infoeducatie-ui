"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import gravatar from "../lib/gravatar";
import RobertColca from "../../assets/img/jury/Robert_Colca.jpg";
import FlaviaOprea from "../../assets/img/jury/flavia_oprea.jpg";
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
	{"avatar": DefaultAvatar, "name": "   Daniel Gherasim                  ", "occupation": "inspector discipline informatice @ ISJ Vrancea"}

    ];
//    let presedinteOnorific = [
//	{"avatar": Centa, "name": "Cența Mariana Răvaș         ", "occupation": "inspector informatică @ ISJ Vrancea"}
//    ];

    let vicepresedinte = [
    {"avatar": DefaultAvatar, "name": "Prof. Gabriela Marchitan", "occupation": "Inspector şcolar general @  ISJ Vrancea"},
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
		{"avatar": Arisanu, "name": "Ana-Maria Arișanu ", "occupation": "Profesor @ Colegiul National 'Mircea cel Batran' Rm. Valcea "},
		{"avatar": DefaultAvatar, "name": "Bogdan Patrut", "occupation": "profesor @ Unuiversitatea Alexandru Ioan Cuza Iași"},
        {"avatar": DefaultAvatar, "name": "Adriel Rafael Matei", "occupation": "student @ University of Groningen"},
        {"avatar": DefaultAvatar, "name": "Ebru Resul", "occupation": "security engineer @ Keysight Technologies"},
        {"avatar": DefaultAvatar, "name": "Gabriela Grigoraș", "occupation": "profesor @ Școala profesională nr.41 Iași"},
        {"avatar": DefaultAvatar, "name": "Victor Iulian Sandu", "occupation": "student @ ASE București"},
        

    ];
    var media = [
		{"avatar": AntoniaHaller, "name": "Antonia Haller", "occupation": "Profesor @ Colegiul National 'Mircea cel Batran' Rm. Valcea "},
        {"avatar": DefaultAvatar, "name": "Burlacu Cătălina", "occupation": "Profesor @ Colegiul Dunărea Galaţi"},
        {"avatar": DefaultAvatar, "name": "Alexandru Negru", "occupation": "Universitatea Babeș-Bolyai"},
        {"avatar": DefaultAvatar, "name": "Roxana Tîmplaru", "occupation": "Profesor @ Colegiul Național 'Ștefan Odobleja'"},
        {"avatar": DefaultAvatar, "name": "Alin Maidan", "occupation": "profesor @ Colegiul Național 'Miron Costin' Galați"},
        {"avatar": FlaviaOprea, "name": "Flavia Oprea", "occupation": "PhD lector @ Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "profesor @ Școala Gimnazială 'Anghel Saligny' Focșani"},
        {"avatar": DefaultAvatar, "name": "Ana Munteanu", "occupation": "UNATC"},
        {"avatar": DefaultAvatar, "name": "Ionela Mihaela Penu", "occupation": "profesor @ Școala Miron Costin Galati"}


    ];
    var robots = [
		{"avatar": DefaultAvatar, "name": "Stan Maria", "occupation": "profesor @ Colegiul Tehnic Radu Negru Galaţi"},
		{"avatar": LaviniuBejenaru, "name": "Laviniu Bejenaru", "occupation": "Profesor @ Colegiul National 'Traian' din Drobeta Turnu Severin"},
        {"avatar": Carmocanu, "name": "Gheorghe Carmocanu", "occupation": "profesor @ Liceul Teoretic 'Mihai Eminescu' Cluj-Napoca"},
		{"avatar": DefaultAvatar, "name": "Marian Stoica", "occupation": "inginer @ S.C. Protoforge Electronic Devices SRL Timișoara"},
        {"avatar": DefaultAvatar, "name": "Cristian Munteanu", "occupation": "Inginer Software @ Haufe Group Romania"},
        {"avatar": DefaultAvatar, "name": "Radu Vrînceanu", "occupation": "student @ Facultatea de Matematică și Informatică București"},
        {"avatar": DefaultAvatar, "name": "Marian Crăciun", "occupation": "inginer @ IV FUTURE"},
        
    ];
    var utilitar = [
        {"avatar": RazvanDeaconescuAvatar, "name": "Răzvan Deaconescu", "occupation": "Șef lucrări @ Universitatea Politehnică din București"},
        {"avatar": DefaultAvatar, "name": "Cristina Anton", "occupation": " profesor @ CCD Brăila"}, 
		{"avatar": DefaultAvatar, "name": "Simion Strugar", "occupation": " profesor @ Colegiul National „George Cosbuc” Nasaud"},		
	    {"avatar": DefaultAvatar, "name": "Denis Troncotă", "occupation": "Software Engineer Freelancer"},
        {"avatar": DefaultAvatar, "name": "Luca Sas", "occupation": "Core Systems Engineer @ Creative Assembly"},
        {"avatar": DefaultAvatar, "name": "Cristian Vasilache", "occupation": "Universitatea Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Vlad Luță", "occupation": " student @ Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Ciprian Ionescu", "occupation": " Delft University of Technology"},
        {"avatar": DefaultAvatar, "name": "George Dragomir", "occupation": " Vrije Universiteit Amsterdam"},
        


    ];
    var web = [
        {"avatar": AdrianaCheres, "name": "Adriana Chereș", "occupation": "Profesor @ Liceul Teoretic Nicolae Bălcescu Cluj Napoca"},
        {"avatar": RobertColca, "name": "Robert Mihai Colca", "occupation": "Software Development Engineer"},
        {"avatar": DefaultAvatar, "name": "Dorin Bibicu", "occupation": "Profesor @ Liceul Teoretic 'Dunarea' Galati"},
        {"avatar": DefaultAvatar, "name": "Rareș Mircea Muntean", "occupation": "profesor @ Liceul Teoretic 'Emil Racoviță' Baia Mare"},
        {"avatar": DefaultAvatar, "name": "Alexandru Botici", "occupation": "profesor @ Universitatea de Vest Timișoara"},
        {"avatar": DefaultAvatar, "name": "Dan Andrei Novac", "occupation": "inginer @ SC eMag IT Research SRL București"},
        {"avatar": DefaultAvatar, "name": "Cosmin Ciolacu", "occupation": "inginer @ S.C. Webfactory SRL București"},
        {"avatar": DefaultAvatar, "name": "Vlad Tudor", "occupation": "profesor @ Liceul Teoretic Național București"},

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
