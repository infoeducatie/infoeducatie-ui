"use strict";

import $ from "jquery";
import React from "react";
import _ from "lodash";
import DeepLinkedStateMixin from "react-deep-link-state";
import { ButtonInput, Input } from "react-bootstrap";

import FormMixin from "../../mixins/form"

require("blueimp-file-upload");

export default React.createClass({
  displayName: "RegisterFinish",

  componentDidMount() {
    $('#fileupload').fileupload({
        dataType: 'json',
        headers: {
          Authorization: this.props.access_token
        },
        add: function (e, data) {
            data.context = $('<p/>').text('Uploading...').appendTo(document.body);
            data.submit();
        },
        done: function (e, data) {
            data.context.text('Upload finished.');
        }
    });
  },

  render() {
    let url = window.config.API_URL + this.props.formEndpoint;
    return <input id="fileupload" type="file" name="screenshots[]" data-url={url} multiple />
  }
});
