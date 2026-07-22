"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import {Link} from "react-router-dom";
import {Grid, Row, Col} from "@ui/bootstrap";

import countify from "../../lib/countify";
import Header from "../header";

import Google from "../../../assets/img/sponsors/google.png";
import Intel from "../../../assets/img/sponsors/intel.png";
import Orange from "../../../assets/img/sponsors/orange.png";
import EasyHost from "../../../assets/img/sponsors/easyhost.png";
import Cisco from "../../../assets/img/sponsors/cisco.png";
import Intuitext from "../../../assets/img/sponsors/intuitext.gif";
import Apdetic from "../../../assets/img/sponsors/apdetic.png";
import Upir from "../../../assets/img/sponsors/upir.png";
import MEN from "../../../assets/img/sponsors/edu.jpg";
import CloudBase from "../../../assets/img/sponsors/cloudbase.png";
import iMedicare from "../../../assets/img/sponsors/imedicare.png";
import eSkills from "../../../assets/img/sponsors/eskills.png";
import gwc from "../../../assets/img/sponsors/girlswhocode.png";
import leonte from "../../../assets/img/sponsors/leonte.png";
import altex from "../../../assets/img/sponsors/altex.gif";
import MTS from "../../../assets/img/sponsors/mts.jpg";
import PajisteSmall from "../../../assets/img/pajiste-720.webp";
import PajisteMedium from "../../../assets/img/pajiste-960.webp";
import Pajiste from "../../../assets/img/pajiste.webp";

export default createLegacyComponent({
  displayName: "Home",

  componentDidMount() {
    this.props.refreshCurrent();
    this.props.changeLanguage("en");
  },

  renderCampDate() {
    let monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
    ];

    if (this.props.edition.camp_start_date === undefined) {
      return "Dates to be announced";
    }

    let startDate = new Date(this.props.edition.camp_start_date);
    let endDate = new Date(this.props.edition.camp_end_date);

    let month = monthNames[endDate.getMonth()];
    let year = 1900 + endDate.getYear();

    return `${startDate.getDate()} - ${endDate.getDate()} ${month} ${year}`;
  },


  render() {
    return <div className="home english">
        <div className="blue-section-wrapper">
            <Grid className="blue-section">
                <Header isLoggedIn={this.props.isLoggedIn}
                        current={this.props.current}
                        language={this.props.language}
                        changeLanguage={this.props.changeLanguage}
                        logout={this.props.logout} />
                <Row>
                    <Col xs={12}>
                        <h1>
                            InfoEducație
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h2>National Contest of IT&amp;C projects</h2>
                        <p className="tagline">
                            Edition&nbsp;
                            {this.props.current.edition.name}
                        </p>
                    </Col>
                </Row>
                <Row className="xsmall-spacing" />
                <Row className="hero-actions">
                    <Col xs={12}>
                        <p className="right-button">
                            <Link to="/about" className="cta-link cta-light">
                                About the contest
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Grid>
        </div>

        <div className="gray-section-wrapper">
            <Grid className="gray-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={6} mdOffset={6}>
                        <h2 className="section-heading">Alumnus</h2>
                        <Row className="small-spacing" />
                        <p className="quote">InfoEducatie is what gave me the
                        drive to learn about web technologies and develop my
                        own projects. One thing I would like to tell
                        contestants: presentation is as important as the work
                        itself! Make sure to rehearse before going in front of
                        the committee. </p>
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
                            <h2 className="location-title">Gălăciuc Camp</h2>
                            <p className="data">
                                <span className="pink-dash"></span>
                                {this.renderCampDate()}
                                <span className="pink-dash"></span>
                            </p>
                            <p className="edition">
                              {countify(this.props.current.edition.count)} Edition
                            </p>
                            <Row className="small-spacing" />
                            <p>
                                <Link to="/photos"
                                   className="cta-link cta-dark">
                                    More pictures
                                </Link>
                            </p>
                        </div>
                    </Col>
                    <Col md={6} className="grass">
                      <img
                        alt="InfoEducatie camp in Focsani"
                        decoding="async"
                        height="998"
                        loading="lazy"
                        src={Pajiste}
                        srcSet={`${PajisteSmall} 720w, ${PajisteMedium} 960w, ${Pajiste} 1440w`}
                        sizes="(min-width: 992px) 50vw, 100vw"
                        width="1440"
                      />
                    </Col>
                </Row>
            </div>
        </div>

        <div className="sponsors-section-wrapper">
            <Grid className="sponsors-section">

            <Row className="small-spacing" />
                        <Row>
                            <Col xs={12}>
                                <h2>Educational partners and supporters</h2>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <p className="logos">
                                    <a href="http://mts.ro/" target="_blank" rel="noreferrer">
                                      <img alt="Romanian Ministry of Youth and Sports" decoding="async" height="75" loading="lazy" src={MTS} width="292" />
                                    </a>
                                    <a href="https://upir.ro/" target="_blank" rel="noreferrer">
                                      <img alt="Romanian Union of Computer Science Teachers" decoding="async" height="70" loading="lazy" src={Upir} width="180" />
                                    </a>
                                    <a href="https://www.edu.ro/" target="_blank" rel="noreferrer">
                                      <img alt="Romanian Ministry of Education" decoding="async" height="78" loading="lazy" src={MEN} width="156" />
                                    </a>

                                </p>
                            </Col>
                        </Row>


                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h3>Gold Sponsors</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <a href="http://google.ro" target="_blank" rel="noreferrer">
                              <img alt="Google" decoding="async" height="100" loading="lazy" src={Google} width="298" />
                            </a>
                            <a href="http://intel.ro" target="_blank" rel="noreferrer">
                              <img alt="Intel" decoding="async" height="100" loading="lazy" src={Intel} width="109" />
                            </a>
                            <a href="http://www.orange.ro/" target="_blank" rel="noreferrer">
                              <img alt="Orange" decoding="async" height="100" loading="lazy" src={Orange} width="100" />
                            </a>
                            <a href="https://imedicare.com/" target="_blank" rel="noreferrer">
                              <img alt="iMedicare" decoding="async" height="140" loading="lazy" src={iMedicare} width="140" />
                            </a>
                        </p>
                    </Col>
                </Row>

                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h3>Silver Sponsors</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <a href="http://www.cisco.com/" target="_blank" rel="noreferrer">
                              <img alt="Cisco" decoding="async" height="100" loading="lazy" src={Cisco} width="183" />
                            </a>
                            <a href="http://www.cloudbase.it/" target="_blank" rel="noreferrer">
                              <img alt="Cloudbase Solutions" decoding="async" height="77" loading="lazy" src={CloudBase} width="260" />
                            </a>
                            <a href="http://leonte.ro/" target="_blank" rel="noreferrer">
                              <img alt="Leonte" decoding="async" height="93" loading="lazy" src={leonte} width="120" />
                            </a>
                            <a href="http://www.altex.ro/" target="_blank" rel="noreferrer">
                              <img alt="Altex" decoding="async" height="60" loading="lazy" src={altex} width="188" />
                            </a>
                        </p>
                    </Col>
                </Row>

                <Row className="small-spacing" />
                <Row>
                    <Col xs={12}>
                        <h3>Bronze Sponsors</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p className="logos">
                            <a href="http://ro.easyhost.com/incubator" target="_blank" rel="noreferrer">
                              <img alt="Easyhost" decoding="async" height="100" loading="lazy" src={EasyHost} width="150" />
                            </a>
                            <a href="http://www.intuitext.ro/" target="_blank" rel="noreferrer">
                              <img alt="Intuitext" decoding="async" height="100" loading="lazy" src={Intuitext} width="326" />
                            </a>
                            <a href="http://asociatiait.ro/" target="_blank" rel="noreferrer">
                              <img alt="APDETIC" decoding="async" height="100" loading="lazy" src={Apdetic} width="150" />
                            </a>
                            <a href="http://eskills4jobs.ec.europa.eu/" target="_blank" rel="noreferrer">
                              <img alt="eSkills for Jobs" decoding="async" height="78" loading="lazy" src={eSkills} width="120" />
                            </a>
                            <a href="https://www.facebook.com/GirlsWhoCodeRO" target="_blank" rel="noreferrer">
                              <img alt="Girls Who Code Romania" decoding="async" height="87" loading="lazy" src={gwc} width="90" />
                            </a>
                        </p>
                    </Col>
                </Row>



            </Grid>
        </div>
    </div>;
  }
});
