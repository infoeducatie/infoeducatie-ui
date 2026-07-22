import request from "./request";

export default function ajax(options, accessToken) {
  const { endpoint, headers: optionHeaders = {}, ...requestOptions } = options;
  const headers = {
    ...(accessToken ? { Authorization: accessToken } : {}),
    ...optionHeaders,
  };

  return request({
    method: "GET",
    ...requestOptions,
    url: endpoint ? `${window.config.API_URL}${endpoint}` : requestOptions.url,
    headers,
  });
}
