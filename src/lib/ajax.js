"use strict";

import _ from "lodash";
import $ from "jquery";


export default function(options, accessToken) {
  let headers = accessToken ? { Authorization: accessToken } : {};

  if (options.endpoint) {
    options.url = window.config.API_URL + options.endpoint;
    delete options.endpoint;
  }

  $.ajax(_.defaults(options, {
    method: "GET",
    headers: headers
  }));
}
