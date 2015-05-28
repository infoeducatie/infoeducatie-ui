// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
"use strict";

import React from "react";

import Header from "./header";
import Authentication from "../mixins/authentication.jsx"

import "./jury.less";


export default React.createClass({

  displayName: "Jury",
  render() {
    return <div className="jury">
        <div className="row blue-section">
            <Header isLoggedIn={this.props.isLoggedIn} />
            <h1>Juriul InfoEduca&#355;ie</h1>
            <h2>Membrii juriului pe categorii</h2>
        </div>
        <div className="row white-section">
          <div className="jury-icon"><span className="jury-educational"></span></div>
          <div className="jury-description">
            <span className="orange-dash">&mdash;</span>
              educațional
            <span className="orange-dash">&mdash;</span>
          </div>
        </div>
        <div className="row white-section">
          <div className="jury-icon"><span className="jury-media"></span></div>
          <div className="jury-description">
            <span className="orange-dash">&mdash;</span>
              multimedia
            <span className="orange-dash">&mdash;</span>
          </div>
        </div>
        <div className="row white-section">
          <div className="jury-icon"><span className="jury-robots"></span></div>
          <div className="jury-description">
            <span className="orange-dash">&mdash;</span>
              roboți
            <span className="orange-dash">&mdash;</span>
          </div>
        </div>
        <div className="row white-section">
          <div className="jury-icon"><span className="jury-utility"></span></div>
          <div className="jury-description">
            <span className="orange-dash">&mdash;</span>
              utilitar
            <span className="orange-dash">&mdash;</span>
          </div>
        </div>
        <div className="row white-section">
          <div className="jury-icon"><span className="jury-web"></span></div>
          <div className="jury-description">
            <span className="orange-dash">&mdash;</span>
              web
            <span className="orange-dash">&mdash;</span>
          </div>
        </div>
    </div>;
  }
});
