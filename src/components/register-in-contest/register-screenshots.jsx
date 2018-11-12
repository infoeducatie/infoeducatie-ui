"use strict";

import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { FormControl, FormGroup, Glyphicon } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterScreenshots",

  render() {
    let url = window.config.API_URL + this.props.formEndpoint;
    return <div>
      <p>Trebuie minim <em>1</em> și maxim <em>3</em> capturi de ecran.</p>
      <p>Până acum ai încărcat <em>{this.props.screenshotsCount}</em>.</p>
      { this.props.screenshotsCount > 0 ?
        <p>Daca nu vrei să mai adaugi capturi de ecran&nbsp;
          <a href="#" data-step={4} onClick={this.props.onSkipStep}>
          click aici</a>.
        </p>
        : null
      }
      <span className="btn btn-success fileinput-button">
        <span><Glyphicon glyph="upload" /> Alege o imagine</span>
        <FormControl ref="fileupload"
               type="file"
               name="screenshots[]"
               data-url={url} />
      </span>
      <hr />
      <div id="progress" className="progress">
          <div className="progress-bar progress-bar-success"
               ref="progressBar" />
      </div>
    </div>;
  }
});
