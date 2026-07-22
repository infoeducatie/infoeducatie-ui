"use strict";


import createLegacyComponent from "@lib/create-legacy-component";
import { Link } from 'react-router-dom';
import {Grid, Row, Col} from "@ui/bootstrap";

import Header from "./header";
import NewsContainer from "./news/news-container";

import "../main.less";
//import PrimariaFocsani from "../../assets/img/sponsors/logoPrimariaFocsani.jpg";
//import Google from "../../assets/img/sponsors/google.png";
//import Intel from "../../assets/img/sponsors/intel.png";
import Micromet from "../../assets/img/sponsors/micromet.jpg";
import Electric from "../../assets/img/sponsors/electric.png";

import Orange from "../../assets/img/sponsors/orange.png";
import EasyHost from "../../assets/img/sponsors/easyhost.png";
import Cisco from "../../assets/img/sponsors/cisco.png";
import Intuitext from "../../assets/img/sponsors/intuitext.gif";
//import Apdetic from "../../assets/img/sponsors/apdetic.png";
import Upir from "../../assets/img/sponsors/upir.png";
import MEN from "../../assets/img/sponsors/edu.jpg";
//import CloudBase from "../../assets/img/sponsors/cloudbase.png";
//import iMedicare from "../../assets/img/sponsors/imedicare.png";
//import eSkills from "../../assets/img/sponsors/eskills.png";
//import gwc from "../../assets/img/sponsors/girlswhocode.png";
import leonte from "../../assets/img/sponsors/leonte.png";
//import altex from "../../assets/img/sponsors/altex.gif";
//import GInfo from "../../assets/img/sponsors/ginfo.png";
//import GreenGroup from "../../assets/img/sponsors/greengroup.png";
import VivaCredit from "../../assets/img/sponsors/vivacredit.png"
//import OracleAcademy from "../../assets/img/sponsors/academy_wht.gif"
import Bitdefender from "../../assets/img/sponsors/bitdefender.jpg"
//import Xpress from "../../assets/img/sponsors/xpress.jpg"
//import Certsign from "../../assets/img/sponsors/certsign.jpg"
import CJVrancea from "../../assets/img/sponsors/logoCJVrancea.jpg"
import InfoBits from "../../assets/img/sponsors/link_infobits_academy.jpg"
import sindicatVrancea  from "../../assets/img/sponsors/SindicatVrancea.jpg"
import cyberedu  from "../../assets/img/sponsors/cyberedu.png"
export default createLegacyComponent({
  displayName: "Home",

  renderCampDate() {
    let monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai",
       "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie",
       "Decembrie"
    ];

    if (this.props.edition.camp_start_date === undefined) {
      return "Perioada va fi anunțată";
    }

    let startDate = new Date(this.props.edition.camp_start_date);
    let endDate = new Date(this.props.edition.camp_end_date);

    let month = monthNames[endDate.getMonth()];
    let year = 1900 + endDate.getYear();

    return `${startDate.getDate()} - ${endDate.getDate()} ${month} ${year}`;
  },

  render() {
    return <div className="home">
        <div className="blue-section-wrapper">
            <Grid className="blue-section">
                        <Header isLoggedIn={this.props.isLoggedIn}
                                current={this.props.current}
                                changeLanguage={this.props.changeLanguage}
                                language={this.props.language}
                                logout={this.props.logout} />
                <Row>
                    <Col>
                        <h1>
                            InfoEducație
                        </h1>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Olimpiada de inovare și creație digitală</h2>
                        <p className="tagline">
                            Ediția&nbsp;
                            {this.props.current.edition.name}
                        </p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
                <Row>
                    <Col md={4} mdOffset={2}>
                        <p className="left-button">
                            <Link to="/inregistrare" className="cta-link cta-primary">
                                Înregistrează-te
                            </Link>
                        </p>
                    </Col>
                    <Col md={4}>
                        <p className="right-button">
                            <Link to="/despre" className="cta-link cta-light">
                                Despre concurs
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Grid>
        </div>

        <div className="green-section-wrapper">
          <NewsContainer />
        </div>

        <div className="gray-section-wrapper">
            <Grid className="gray-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={6} mdOffset={6}>
                        <h2 className="section-heading">Alumnus</h2>
                        <Row className="small-spacing" />
                        <p className="quote">InfoEducatie mi-a oferit o
                         motivație să învăț tehnologii web și să dezvolt
                         proiectul meu de atunci. Am un sfat pentru
                         participanți: prezentarea este la fel de importantă
                         ca lucrarea in sine! Repetați înainte sa veniți în
                         fața comisiei.</p>
                        <Row className="small-spacing" />
                        <h3 className="alumnus-name">Cristian Strat</h3>
                        <p className="alumnus-position">
                            Ex Growth Manager @ Twitter
                        </p>
                    </Col>
                </Row>
                <Row className="small-spacing" />
            </Grid>
        </div>

        <div className="yellow-section-wrapper">
            <div className="yellow-section container-fluid">
                <Row>
                    <Col md={4} mdOffset={2} className="text middle-align">
                        <div className="wrapper-for-flexbox">
                            <h2 className="location-title">Focșani</h2>
                            <p className="data">
                                <span className="pink-dash"></span>
                                {this.renderCampDate()}
                                <span className="pink-dash"></span>
                            </p>
                            <p className="edition">Ediția {this.props.current.edition.count}</p>
                            <Row className="small-spacing" />
                            <p>
                                <Link to="/poze"
                                   className="cta-link cta-dark">
                                    Mai multe poze
                                </Link>
                            </p>
                        </div>
                    </Col>
                    <Col md={6} className="grass" />
                </Row>
            </div>
        </div>

        <div className="sponsors-section-wrapper">
            <Grid className="sponsors-section">

            <Row className="small-spacing" />
            <Row>
                <Col xs={12}>
                    <h2>Parteneri educaționali și finanțatori</h2>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <div className="logos">
                        <a href="https://www.edu.ro/" target="_blank" rel="noreferrer">
                          <img alt="Ministerul Educației" decoding="async" loading="lazy" src={MEN} />
                        </a>
                        <a href="https://upir.ro/" target="_blank" rel="noreferrer">
                          <img alt="Uniunea Profesorilor de Informatică din România" decoding="async" loading="lazy" src={Upir} />
                        </a>
                        <a href="https://cjvrancea.ro/" target="_blank" rel="noreferrer">
                          <img alt="Consiliul Județean Vrancea" decoding="async" loading="lazy" src={CJVrancea} />
                        </a>
                    </div>
                </Col>
            </Row>

                <Row className="small-spacing" />
               <Row>
                    <Col xs={12}>
                        <h3>Sponsori Gold</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className="logos">
                          <a href="https://vivacredit.ro/" target="_blank" rel="noreferrer">
                            <img alt="Viva Credit" decoding="async" loading="lazy" src={VivaCredit} />
                          </a>
                          <a href="https://bitdefender.com" target="_blank" rel="noreferrer">
                            <img alt="Bitdefender" decoding="async" loading="lazy" src={Bitdefender} />
                          </a>
                          <a href="https://orange.ro" target="_blank" rel="noreferrer">
                            <img alt="Orange" decoding="async" loading="lazy" src={Orange} />
                          </a>
                          <a href="https://cisco.com/" target="_blank" rel="noreferrer">
                            <img alt="Cisco" decoding="async" loading="lazy" src={Cisco} />
                          </a>
                          <a href="https://www.intuitext.ro/" target="_blank" rel="noreferrer">
                            <img alt="Intuitext" decoding="async" loading="lazy" src={Intuitext} />
                          </a>
                        </div>
                    </Col>
                </Row>

                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h3>Sponsori Silver</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className="logos">
                          
                            <a href="https://leonte.ro/" target="_blank" rel="noreferrer">
                              <img alt="Leonte" decoding="async" loading="lazy" src={leonte} />
                            </a>
							<a href="https://ro.easyhost.com/" target="_blank" rel="noreferrer">
                              <img alt="Easyhost" decoding="async" loading="lazy" src={EasyHost} />
                            </a>

                            <a href="https://ebooks.infobits.ro" target="_blank" rel="noreferrer">
                              <img alt="InfoBits Academy" decoding="async" loading="lazy" src={InfoBits} />
                            </a>
                            <a href="https://slivrancea.blogspot.com/" target="_blank" rel="noreferrer">
                              <img alt="Sindicatul Liber din Învățământ Vrancea" decoding="async" loading="lazy" src={sindicatVrancea} />
                            </a>
                            <a href="https://www.cyber-edu.co/" target="_blank" rel="noreferrer">
                              <img alt="CyberEDU" decoding="async" loading="lazy" src={cyberedu} />
                            </a>
                            <a href="https://www.micromet.ro/" target="_blank" rel="noreferrer">
                              <img alt="Micromet" decoding="async" loading="lazy" src={Micromet} />
                            </a>
                            <a href="https://www.electricsrl.ro/" target="_blank" rel="noreferrer">
                              <img alt="Electric SRL" decoding="async" loading="lazy" src={Electric} />
                            </a>

                        </div>
                    </Col>
                </Row>

               


            </Grid>
        </div>
    </div>;
  }
});
