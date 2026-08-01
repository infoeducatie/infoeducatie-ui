"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { Grid, Col, Row } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

import Header from "./header";
import JuryDescription from "./jury-description";

import "../main.less";
import RobertColca from "../../assets/img/jury/Robert_Colca.jpg";
//import FlaviaOprea from "../../assets/img/jury/flavia_oprea.jpg";
//import bogdan_bocse from "../../assets/img/jury/bogdan_bocse.jpg";
import AntoniaHaller from "../../assets/img/jury/antoniahaller.jpg";
import Carmocanu from "../../assets/img/jury/carmocanu.jpg";
import Arisanu from "../../assets/img/jury/arisanu.png";
import DanielPopaAvatar from "../../assets/img/jury/daniel_popa.jpg";
import DomsaAvatar from "../../assets/img/jury/domsa_ovidiu.jpg";
import EmilOneaAvatar from "../../assets/img/jury/emil_onea.jpg";
import LaviniuBejenaru from "../../assets/img/jury/laviniubejenaru.png";
//import FasanAvatar from "../../assets/img/jury/fasan_mihail.jpg";
//import MihaiAgapeAvatar from "../../assets/img/jury/mihai_agape.jpg";
import RazvanDeaconescuAvatar from "../../assets/img/jury/razvan_deaconescu.jpg";
//import RodicaPinteaAvatar from "../../assets/img/jury/rodica_pintea.jpg";
//import StelianNiculescuAvatar from "../../assets/img/jury/stelian_niculescu.jpg";
import AdrianaCheres from "../../assets/img/jury/adrianacheres.jpg";
import DefaultAvatar from "../../assets/img/jury/default.png";
import DefaultDocument from "../../assets/img/icons/doc.png";

const Jury = createLegacyComponent({
  displayName: "Jury",
  render() {
    const editionName = this.props.current.edition.name ||
      this.props.current.edition.count ||
      this.props.current.edition.year;
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
      {"name": this.props.t("categories.educational"), "link": "https://data.infoeducatie.ro/manual/educational.pdf"},
      {"name": this.props.t("categories.multimedia"), "link": "https://data.infoeducatie.ro/manual/multimedia.pdf"},
      {"name": this.props.t("categories.robots"), "link": "https://data.infoeducatie.ro/manual/roboti.pdf"},
      {"name": this.props.t("categories.utility"), "link": "https://data.infoeducatie.ro/manual/utilitar.pdf"},
      {"name": this.props.t("categories.web"), "link": "https://data.infoeducatie.ro/manual/web.pdf"}
    ];

    let leadership = [
      {...presedinte[0], role: this.props.t("jury.roles.president")},
      {...presedinteExecutiv[0], role: this.props.t("jury.roles.executivePresident")},
      {...vicepresedinte[0], role: this.props.t("jury.roles.vicePresident")},
      {...vicepresedinteExecutiv[0], role: this.props.t("jury.roles.executiveVicePresident")},
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
                <h1>{this.props.t("jury.title")}</h1>
                <h2>{this.props.t("edition.label", { edition: editionName })}</h2>
              </Col>
            </Row>
          </Grid>
        </div>




        <Grid className="white-section">
          <Row>
            <JuryDescription name={this.props.t("jury.leadership")} members={leadership}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon educational" name={this.props.t("jury.educational")} members={educational}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon utilitar" name={this.props.t("jury.utility")} members={utilitar}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon web" name={this.props.t("jury.web")} members={web}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon roboti" name={this.props.t("jury.robots")} members={robots}/>
          </Row>
          <Row>
            <JuryDescription iconClass="section-icon multimedia" name={this.props.t("jury.multimedia")} members={media}/>
          </Row>
          <Row>
            <JuryDescription name={this.props.t("jury.technical")} members={comisiaTehnica}/>
          </Row>
          <Row>
            <JuryDescription name={this.props.t("jury.secretary")} members={secretar}/>
          </Row>
        </Grid>

        <div className="orange-section-wrapper">
          <Grid className="orange-section">
            <Row>
              <Col className="block">
                <h2 className="jury-criteria-desc">
                    <span className="pink-dash" />
                      {this.props.t("jury.criteria")}
                    <span className="pink-dash" />
                </h2>
                <div className="jury-criteria-documents">
                  {criteria.map((doc) => {
                    return <a
                      aria-label={this.props.t("jury.openCriteria", { category: doc.name })}
                      className="jury-criteria"
                      href={doc.link}
                      key={doc.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="jury-criteria-txt">{doc.name}</span>
                      <img alt="" height="35" src={DefaultDocument} width="50" />
                    </a>;
                  })}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>

    </div>;
  }
});

export default withTranslation("public")(Jury);
