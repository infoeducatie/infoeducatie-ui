"use strict";

import React from "react";

import Header from "./header";
import Footer from "./footer";
import Authentication from "../mixins/authentication.jsx"

import "./home.less";


export default React.createClass({

  displayName: "Home",
  render() {
    return <div className="home">
        <div className="row blue-section">
            <Header isLoggedIn={this.props.isLoggedIn} />
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

        <div className="row green-section">
            <div className="inner-row">
                <h1>News</h1>
            </div>
        </div>

        <div className="row gray-section">
            <div className="inner-row">
                <h1>Alumni</h1>
            </div>
        </div>

        <div className="row yellow-section">
            <div className="inner-row">
                <h1>Pics</h1>
            </div>
        </div>

        <div className="row sponsors-section">
            <div className="inner-row">
                <h1>Sponsors</h1>
            </div>
        </div>

        <div>
            <h1>Jury</h1>
        </div>
        <Footer />
    </div>;
  }
});
