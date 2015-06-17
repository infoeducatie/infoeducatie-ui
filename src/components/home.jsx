"use strict";

import React from "react";

import Header from "./header";
import Authentication from "../mixins/authentication.jsx"

import "./home.less";
import Cristi from "../../assets/img/cristi.png";

export default React.createClass({

  displayName: "Home",
  render() {
    return <div className="home">
        <div className="blue-section-wrapper">
            <div className="container">
                <div className="row blue-section">
                    <div className="col-md-12">
                        <Header isLoggedIn={this.props.isLoggedIn} />
                        <h1>InfoEducație Ediția 2015</h1>
                        <h2>Concurs Național de Informatică</h2>
                        <p className="tagline">The best software engineering contest in the world.</p>
                        <p className="call-to-action">
                            <a href="#" className="link link-primary">Înregistrează-te</a>
                            <a href="#" className="link link-secondary">Citește mai multe</a>
                        </p>
                        <table>
                            <tr className="entities">
                                <td>Participanți</td>
                                <td>Proiecte</td>
                                <td>Județe</td>
                            </tr>
                            <tr className="values">
                                <td>250+</td>
                                <td>120+</td>
                                <td>35+</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div className="green-section-wrapper">
            <div className="green-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="column-left col-md-4">
                            <h1>News</h1>
                            <p className="date">16 aprilie 2069</p>
                            <h2>Deadline-ul de înscriere a fost prelungit.</h2>
                            <p className="message">Deadline-ul de înscriere pentru InfoEducație Online a
                            fost prelungit până marți 21 aprilie. Sursele trebuie
                            trimise până joi noaptea pe Github.</p>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="column-right col-md-4">
                            <div>
                                <p className="date">18 martie 2015</p>
                                <p className="message">Au inceput inscrierile pentru InfoEducatie 2015</p>
                            </div>
                            <div>
                                <p className="date">08 martie 2015</p>
                                <p className="message">Website-ul InfoEducatie Online 2015 a fost
                                actualizat</p>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="gray-section-wrapper">
            <div className="gray-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-6">
                            <h1>Alumnus</h1>
                            <p className="quote">La momentul respectiv părea o
                            joacă, acum infoarena este o organizație cu o
                            activitate foarte solidă și cu un impact mare în
                            rândul elevilor pasionați de informatică.</p>
                            <p className="alumnus-name">Cristian Strat</p>
                            <p className="alumnus-position">
                                Ex Growth Manager @ Twitter
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="yellow-section-wrapper">
            <div className="yellow-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-2 yellow">
                            <h1>Tabără Gălăciuc</h1>
                            <p className="data">
                                <span className="pink-dash"></span> 2 - 8 August 2015 <span className="pink-dash"></span>
                            </p>
                            <p className="editia">Ediția 23</p>
                            <p className="mai-multe-poze">
                                <a href="#" className="link link-secondary">
                                    Mai multe poze
                                </a>
                            </p>
                        </div>
                        <div className="col-md-6 pajiste">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="sponsors-section-wrapper">
            <div className="sponsors-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Sponsors</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
  }
});
