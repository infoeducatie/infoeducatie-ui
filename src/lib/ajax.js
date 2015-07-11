import $ from "jquery";

export default function(endpoint, success=()=>{}, data={}, accessToken=null,
                        error=()=>{}, method="GET") {
  let headers = {};

  if (accessToken) {
    headers = {
      Authorization: accessToken
    };
  }

  $.ajax({
    method: method,
    url: window.config.API_URL + endpoint,
    data: data,
    headers: headers,
    success: success,
    error: error
  })
}
