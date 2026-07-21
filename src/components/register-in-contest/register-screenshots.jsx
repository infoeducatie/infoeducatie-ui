"use strict";

import React from "react";
import { FormControl, Glyphicon } from "react-bootstrap";

export default React.createClass({
  displayName: "RegisterScreenshots",

  getInitialState() {
    return {
      hasErrored: false,
      progress: 0,
      uploading: false
    };
  },

  onFileChange(event) {
    let input = event.currentTarget;
    let file = input.files[0];

    if (!file || this.state.uploading) {
      return;
    }

    let request = new XMLHttpRequest();
    let data = new FormData();
    data.append("screenshots[]", file);

    request.open("POST", window.config.API_URL + this.props.formEndpoint);
    request.setRequestHeader("Authorization", this.props.access_token);
    request.upload.onprogress = (progressEvent) => {
      if (progressEvent.lengthComputable) {
        this.setState({
          progress: parseInt(progressEvent.loaded / progressEvent.total * 100, 10)
        });
      }
    };
    request.onload = () => {
      input.value = "";

      if (request.status >= 200 && request.status < 300) {
        this.setState({uploading: false, progress: 100});
        this.props.onSubmit();
      } else {
        this.setUploadError();
      }
    };
    request.onerror = () => {
      input.value = "";
      this.setUploadError();
    };

    this.setState({hasErrored: false, progress: 0, uploading: true});
    request.send(data);
  },

  setUploadError() {
    this.setState({hasErrored: true, progress: 0, uploading: false});
  },

  render() {
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
               accept="image/jpeg,image/png,image/webp"
               disabled={this.state.uploading}
               onChange={this.onFileChange} />
      </span>
      {this.state.hasErrored ?
        <p className="alert alert-danger">
          Imaginea nu a putut fi incarcata. Incearca din nou.
        </p>
        : null}
      <hr />
      <div id="progress" className="progress">
          <div className="progress-bar progress-bar-success"
               style={{width: this.state.progress + "%"}} />
      </div>
    </div>;
  }
});
