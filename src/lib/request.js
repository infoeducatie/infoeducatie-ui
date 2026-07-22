function appendData(searchParams, data = {}) {
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item));
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });
}

export function toQueryString(data) {
  const searchParams = new URLSearchParams();
  appendData(searchParams, data);
  return searchParams.toString();
}

function jsonp({ url, data, success, error, complete }) {
  const callbackName = `infoeducatieJsonp${Date.now()}${Math.random()
    .toString(16)
    .slice(2)}`;
  const searchParams = new URLSearchParams();
  appendData(searchParams, data);

  let requestUrl = url.replace(/([?&][^=]+)=\?/, `$1=${callbackName}`);
  if (!requestUrl.includes(callbackName)) {
    searchParams.set("callback", callbackName);
  }
  const separator = requestUrl.includes("?") ? "&" : "?";
  const query = searchParams.toString();
  if (query) {
    requestUrl += `${separator}${query}`;
  }

  const script = document.createElement("script");
  let settled = false;

  const cleanup = () => {
    delete window[callbackName];
    script.remove();
  };

  const finish = (payload, failed = false) => {
    if (settled) return;
    settled = true;
    const response = { responseJSON: payload };
    if (failed) error?.(response);
    else success?.(payload);
    complete?.(response);
    cleanup();
  };

  window[callbackName] = (payload) => finish(payload);
  script.onerror = () => finish(null, true);
  script.src = requestUrl;
  document.head.appendChild(script);

  window.setTimeout(() => finish(null, true), 15000);
}

export default async function request(options) {
  const {
    complete,
    data,
    dataType,
    error,
    headers = {},
    method = "GET",
    success,
  } = options;
  let { url } = options;

  if (dataType === "jsonp") {
    jsonp({ url, data, success, error, complete });
    return;
  }

  const normalizedMethod = method.toUpperCase();
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");
  const fetchOptions = {
    method: normalizedMethod,
    headers: requestHeaders,
  };

  if (data && normalizedMethod === "GET") {
    const query = toQueryString(data);
    if (query) {
      url += `${url.includes("?") ? "&" : "?"}${query}`;
    }
  } else if (data instanceof FormData) {
    fetchOptions.body = data;
  } else if (data && normalizedMethod !== "GET") {
    requestHeaders.set(
      "Content-Type",
      "application/x-www-form-urlencoded;charset=UTF-8",
    );
    fetchOptions.body = toQueryString(data);
  }

  try {
    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
    const responseLike = {
      status: response.status,
      statusText: response.statusText,
      responseJSON: contentType.includes("application/json") ? payload : null,
      responseText: typeof payload === "string" ? payload : JSON.stringify(payload),
    };

    if (!response.ok) {
      error?.(responseLike);
      complete?.(responseLike);
      return;
    }

    success?.(payload);
    complete?.(responseLike);
  } catch (requestError) {
    const responseLike = {
      status: 0,
      statusText: requestError.message,
      responseJSON: null,
      responseText: "",
    };
    error?.(responseLike);
    complete?.(responseLike);
  }
}
