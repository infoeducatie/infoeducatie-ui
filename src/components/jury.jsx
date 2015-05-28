// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
"use strict";

import React from "react";

import Header from "./header";
import JuryDescription from "./jury_description.jsx";
import Authentication from "../mixins/authentication.jsx";

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
        <JuryDescription iconClass="educational" name="educațional" />
        <JuryDescription iconClass="media" name="multimedia" />
        <JuryDescription iconClass="robots" name="roboți" />
        <JuryDescription iconClass="utility" name="utilitar" />
        <JuryDescription iconClass="web" name="web" />
    </div>;
  }
});
