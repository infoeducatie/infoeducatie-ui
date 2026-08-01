"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import { FormControl, Glyphicon } from "@ui/bootstrap";
import { withTranslation } from "react-i18next";

const RegisterScreenshots = createLegacyComponent({
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
      <p>{this.props.t("screenshots.requirements")}</p>
      <p>{this.props.t("screenshots.count", { count: this.props.screenshotsCount })}</p>
      { this.props.screenshotsCount > 0 ?
        <p>{this.props.t("screenshots.skip")}&nbsp;
          <a href="#" data-step={4} onClick={this.props.onSkipStep}>
          {this.props.t("clickHere")}</a>.
        </p>
        : null
      }
      <span className="btn btn-success fileinput-button">
        <span><Glyphicon glyph="upload" /> {this.props.t("screenshots.choose")}</span>
        <FormControl
               type="file"
               name="screenshots[]"
               accept="image/jpeg,image/png,image/webp"
               disabled={this.state.uploading}
               onChange={this.onFileChange} />
      </span>
      {this.state.hasErrored ?
        <p className="alert alert-danger">
          {this.props.t("screenshots.error")}
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

export default withTranslation("registration")(RegisterScreenshots);
