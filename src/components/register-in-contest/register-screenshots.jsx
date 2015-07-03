"use strict";

import "blueimp-file-upload";
import $ from "jquery";
import React from "react";
import _ from "lodash";
import DeepLinkedStateMixin from "react-deep-link-state";
import { ButtonInput, Input } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterScreenshot",

  componentDidMount() {
    $('#fileupload').fileupload({
      dataType: 'json',
      headers: {
        Authorization: this.props.access_token
      },
      add: () => {
        data.submit();
      },
      done: () => {
        console.log('finished');
      }
    });
  },

  render() {
    let url = window.config.API_URL + this.props.formEndpoint;
    return <input id="fileupload"
                  type="file"
                  name="screenshots[]"
                  data-url={url}
                  multiple />
  }
});
