"use strict";

import React from "react";
import { Grid, Col, Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import gravatar from "../lib/gravatar";
import RobertColca from "../../assets/img/jury/Robert_Colca.jpg";
//import FlaviaOprea from "../../assets/img/jury/flavia_oprea.jpg";
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
    {"avatar": RazvanDeaconescuAvatar, "name": "Conf. Dr. Ing. Răzvan Diaconescu", "occupation": "conferențiar @ UNȘT Politehnica București"},
    ];

    let presedinteExecutiv = [
	{"avatar": DefaultAvatar, "name": "   Daniel Gherasim                  ", "occupation": "inspector discipline informatice @ ISJ Vrancea"}

    ];
    let vicepresedinteExecutiv = [
	{"avatar": DefaultAvatar, "name": "Georgeta Antonia Rodica Crăciunescu", "occupation": "consilier @ MEC"}
    ];

    let vicepresedinte = [
    {"avatar": DefaultAvatar, "name": "Prof. Livia – Silvia MARCU", "occupation": "Inspector şcolar general @  ISJ Vrancea"},
    ];

    let secretar = [
      {"avatar": DefaultAvatar, "name": "Cristina Ionescu", "occupation": "profesor @ Școala Gimnazială 'Anghel Saligny' Focșani"}
     
    ];

    let comisiaTehnica = [
      {"avatar": EmilOneaAvatar, "name": "Emil Onea", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      {"avatar": DefaultAvatar, "name": "Dan Roșioru", "occupation": "Profesor @ Colegiul Naţional “Unirea“ Focşani"},
      {"avatar": DomsaAvatar, "name": "Ovidiu Domșa", "occupation": "Profesor @ Univ. Alba Iulia"},
      {"avatar": DefaultAvatar, "name": "Monica Chiriță", "occupation": "Profesor @ Colegiul National Unirea"}

    ];

    var educational = [

        //
        {"avatar": DanielPopaAvatar, "name": "Daniel Popa", "occupation": "profesor @ Colegiul Național 'Aurel Vlaicu' Orastie"},
		{"avatar": Arisanu, "name": "Ana-Maria Arișanu ", "occupation": "Profesor @ Colegiul National 'Mircea cel Batran' Rm. Valcea "},
        {"avatar": DefaultAvatar, "name": "Barbu Mihai", "occupation": "student @ UNȘT Politehnica București"},
		
		{"avatar": DefaultAvatar, "name": "Zaim-Oprea Flavia ", "occupation": "profesor @ UNȘT Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Adriel Rafael Matei           ", "occupation": "student @ Radboud University"},
        {"avatar": DefaultAvatar, "name": "Ebru Resul                               ", "occupation": "UNȘT Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Negru Alexandru                          ", "occupation": "Software Engineer @ HOOTSUITE"},
        {"avatar": DefaultAvatar, "name": "Victor Iulian Sandu           ", "occupation": "Lead Software Engineer & Architect @ Axes Software"},
        

    ];
    var media = [
		{"avatar": DefaultAvatar, "name": "Roxana Tîmplaru", "occupation": "Profesor @ Colegiul Național 'Ștefan Odobleja'"},
		{"avatar": AntoniaHaller, "name": "Antonia Haller", "occupation": "Profesor @ Colegiul National 'Mircea cel Batran' Rm. Valcea "},
        {"avatar": DefaultAvatar, "name": "Emilia-Felicia COȘNIȚĂ", "occupation": "profesor @ Liceul Teoretic Miron Costin, Pașcani"},
		{"avatar": DefaultAvatar, "name": "Alin Maidan", "occupation": "profesor @ Colegiul Național 'Miron Costin' Galați"},
		{"avatar": DefaultAvatar, "name": "Rodica-Gabriela SPIRIDON", "occupation": "profesor @ Liceul Sanitar Antim Ivireanu, Râm. Vâlcea"},
        {"avatar": DefaultAvatar, "name": "Penu Ionela-Mihaela       ", "occupation": "profesor @ Șc. Gim. „Miron Costin”, Galați"},
        {"avatar": DefaultAvatar, "name": "Micu George-Alexandru     ", "occupation": "UNȘT Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Oprea Theodora-Otilia", "occupation": "student @ UNȘT Politehnica București"},        
        {"avatar": DefaultAvatar, "name": "Munteanu Ana Adelina ", "occupation": "Dreamfilm Antena1"}


    ];
    var robots = [
        {"avatar": RobertColca, "name": "Robert Mihai Colca", "occupation": "doctorand @ Universitatea de Vest din Timișoara"},
		{"avatar": DefaultAvatar, "name": "Stan Maria", "occupation": "profesor @ Colegiul Tehnic Radu Negru Galaţi"},
		{"avatar": DefaultAvatar, "name": "Burlacu Cătălina", "occupation": "Profesor @ Colegiul Dunărea Galaţi"},
		{"avatar": LaviniuBejenaru, "name": "Laviniu Bejenaru", "occupation": "Profesor @ Colegiul National 'Traian' din Drobeta Turnu Severin"},
        {"avatar": Carmocanu,     "name": "Gheorghe Carmocanu       ", "occupation": "profesor @ Liceul Teoretic 'Mihai Eminescu' Cluj-Napoca"},
		{"avatar": DefaultAvatar, "name": "Crăciun Marian              ", "occupation": "inginer @ Global Brother SRL"},
        {"avatar": DefaultAvatar, "name": "Deonise Costin-Alexandru", "occupation": "UNȘT Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Grumeza Theodor-Radu", "occupation": "doctorand @ Universitatea de Vest din Timișoara"},
        {"avatar": DefaultAvatar, "name": "Ionescu Cristina Elena", "occupation": "profesor @ Șc. Gim. Anghel Saligny Focșani"},
        
    ];
    var utilitar = [
		{"avatar": DefaultAvatar, "name": "       Simion Strugar                      ", "occupation": " profesor @ Col. Nat. „George Cosbuc” Nasaud"},
		{"avatar": DefaultAvatar, "name": "Gorea-Zamfir Claudiu-Cristian", "occupation": "inspector @ Lic. Teo. de Informatică Gr. Moisil Iași"},
		{"avatar": DefaultAvatar, "name": "Ștefănescu Alin                            ", "occupation": "profesor @ Universitatea din București"},
        {"avatar": DefaultAvatar, "name": "Anton Nicolae                            ", "occupation": " profesor @ Lic. Teh. Anghel Saligny Brăila"}, 
		{"avatar": DefaultAvatar, "name": "Denis Troncotă", "occupation": "inginer @ TDR TECH S.R.L."},
        {"avatar": DefaultAvatar, "name": "Luca Sas", "occupation": "inginer @ Team Kappa Studio"},
        {"avatar": DefaultAvatar, "name": "Cristian Vasilache", "occupation": "AVL Romania"},
        {"avatar": DefaultAvatar, "name": "Vlad Luță", "occupation": " student @ UNȘT Politehnica București"},
        {"avatar": DefaultAvatar, "name": "George Dragomir", "occupation": "Clinica Prevencia SRL"},
		{"avatar": DefaultAvatar, "name": "Popa Liviu", "occupation": "student @ Universitatea din București"},

                

    ];
    var web = [
        {"avatar": AdrianaCheres, "name": "Adriana Chereș", "occupation": "Profesor @ Liceul Teoretic Nicolae Bălcescu Cluj Napoca"},
        {"avatar": DefaultAvatar, "name": "Mihai Nan", "occupation": "profesor @ UNȘT Politehnica București"},
        {"avatar": DefaultAvatar, "name": "Dorin Bibicu", "occupation": "Profesor @ Liceul Teoretic 'Dunarea' Galati"},
        {"avatar": DefaultAvatar, "name": "Anton Cristina", "occupation": "profesor @ Colegiul Național „Gheorghe Munteanu Murgoci” Brăila"},
        {"avatar": DefaultAvatar, "name": "Muntean Rareș Mircea", "occupation": "profesor @ Liceul Teoretic „Emil Racoviță”, Baia Mare"},
        {"avatar": DefaultAvatar, "name": "Alexandru Botici", "occupation": "inginer @ Wolt Development Romania S.R.L."},
        {"avatar": DefaultAvatar, "name": "Alexandru Borza", "occupation": "inginer @ Wolt Development Romania S.R.L."},
        {"avatar": DefaultAvatar, "name": "Cosmin Ciolacu", "occupation": "freelancer"},
        {"avatar": DefaultAvatar, "name": "Tal Paul-Gabriel", "occupation": "student @ Universitatea Babeș-Bolyai"},
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
            <JuryDescription name="Presedinte Executiv" members={presedinteExecutiv}/>
        
            <JuryDescription name="vicepreședinte" members={vicepresedinte}/>
			<JuryDescription name="vicepreședinte executiv" members={vicepresedinteExecutiv}/>
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
